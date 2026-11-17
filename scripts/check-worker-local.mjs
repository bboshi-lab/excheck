import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { once } from "node:events"
import { mkdtemp, rm } from "node:fs/promises"
import { createServer } from "node:net"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { setTimeout as delay } from "node:timers/promises"
import { fileURLToPath } from "node:url"

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const temporaryDirectory = await mkdtemp(join(tmpdir(), "launchboard-worker-"))
const portReservation = createServer()

portReservation.listen(0, "127.0.0.1")
await once(portReservation, "listening")

const { port } = portReservation.address()

await new Promise((resolveClose) => portReservation.close(resolveClose))

const workerOrigin = `http://127.0.0.1:${port}`
let workerProcess
let workerOutput = ""

const startWorker = async () => {
  workerOutput = ""

  workerProcess = spawn(
    process.execPath,
    [
      join(projectRoot, "node_modules/wrangler/bin/wrangler.js"),
      "dev",
      "--local",
      "--ip",
      "127.0.0.1",
      "--port",
      String(port),
      "--persist-to",
      join(temporaryDirectory, "state"),
    ],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        WRANGLER_SEND_METRICS: "false",
        WRANGLER_LOG_PATH: join(temporaryDirectory, "wrangler.log"),
        XDG_CONFIG_HOME: join(temporaryDirectory, "config"),
      },
      detached: process.platform !== "win32",
      stdio: ["ignore", "pipe", "pipe"],
    },
  )

  workerProcess.stdout.on("data", (chunk) => {
    workerOutput = (workerOutput + chunk).slice(-12000)
  })
  workerProcess.stderr.on("data", (chunk) => {
    workerOutput = (workerOutput + chunk).slice(-12000)
  })

  let spawnError

  workerProcess.on("error", (error) => {
    spawnError = error
  })

  const deadline = Date.now() + 30000

  while (Date.now() < deadline) {
    if (spawnError) {
      throw spawnError
    }

    if (workerProcess.exitCode !== null) {
      throw new Error(`Worker 시작 실패\n${workerOutput}`)
    }

    const healthResponse = await fetch(`${workerOrigin}/api/health`, {
      signal: AbortSignal.timeout(1000),
    }).catch(() => undefined)

    if (healthResponse?.ok) {
      return
    }

    await delay(150)
  }

  throw new Error(`Worker 준비 시간 초과\n${workerOutput}`)
}

const stopWorker = async () => {
  const workerToStop = workerProcess

  if (!workerToStop || workerToStop.exitCode !== null || workerToStop.signalCode !== null) {
    return
  }

  const workerExit = once(workerToStop, "exit")

  if (process.platform === "win32") {
    workerToStop.kill("SIGTERM")
  } else {
    process.kill(-workerToStop.pid, "SIGTERM")
  }

  await workerExit

  workerProcess = undefined
}

const requestWorker = async (path, method = "GET", body) => {
  const response = await fetch(`${workerOrigin}/api/${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(5000),
  })

  return { status: response.status, body: await response.json() }
}

try {
  await startWorker()

  assert.equal((await requestWorker("board")).body.tasks.length, 6)

  const createdTask = await requestWorker("tasks", "POST", {
    title: "로컬 재시작 확인",
    category: "Operations",
  })

  assert.equal(createdTask.status, 201)

  assert.equal((await requestWorker(`tasks/${createdTask.body.id}`, "PATCH", { done: true })).body.done, true)
  assert.equal((await requestWorker("tasks", "POST", { title: " ", category: "Design" })).status, 400)

  const concurrentRequests = await Promise.all(
    Array.from({ length: 6 }, (_, index) =>
      requestWorker("tasks", "POST", {
        title: `동시 생성 ${index}`,
        category: "Engineering",
      }),
    ),
  )

  assert.ok(concurrentRequests.every((result) => result.status === 201))
  assert.equal((await requestWorker("board")).body.tasks.length, 13)

  await stopWorker()

  await startWorker()

  const restoredBoard = (await requestWorker("board")).body

  assert.equal(restoredBoard.tasks.length, 13)
  assert.equal(restoredBoard.tasks.find((task) => task.id === createdTask.body.id)?.done, true)
  assert.equal(restoredBoard.activity.length, 9)

  console.log("로컬 workerd 검증 통과: 생성·완료·입력 거절·동시 요청·프로세스 재시작 후 복원")
} finally {
  await stopWorker()
  await rm(temporaryDirectory, { recursive: true, force: true })
}
