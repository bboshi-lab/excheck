import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const temporary = await mkdtemp(join(tmpdir(), "launchboard-worker-"));
const reservation = createServer();
reservation.listen(0, "127.0.0.1");
await once(reservation, "listening");
const { port } = reservation.address();
await new Promise((resolveClose) => reservation.close(resolveClose));
const origin = `http://127.0.0.1:${port}`;
let processHandle;
let output = "";

const start = async () => {
  output = "";
  processHandle = spawn(
    process.execPath,
    [
      join(root, "node_modules/wrangler/bin/wrangler.js"),
      "dev",
      "--local",
      "--ip",
      "127.0.0.1",
      "--port",
      String(port),
      "--persist-to",
      join(temporary, "state"),
    ],
    {
      cwd: root,
      env: {
        ...process.env,
        WRANGLER_SEND_METRICS: "false",
        WRANGLER_LOG_PATH: join(temporary, "wrangler.log"),
        XDG_CONFIG_HOME: join(temporary, "config"),
      },
      detached: process.platform !== "win32",
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  processHandle.stdout.on("data", (chunk) => {
    output = (output + chunk).slice(-12000);
  });
  processHandle.stderr.on("data", (chunk) => {
    output = (output + chunk).slice(-12000);
  });
  let spawnError;
  processHandle.on("error", (error) => {
    spawnError = error;
  });
  const deadline = Date.now() + 30000;

  while (Date.now() < deadline) {
    if (spawnError) throw spawnError;
    if (processHandle.exitCode !== null)
      throw new Error(`Worker 시작 실패\n${output}`);
    const response = await fetch(`${origin}/api/health`, {
      signal: AbortSignal.timeout(1000),
    }).catch(() => undefined);
    if (response?.ok) return;
    await delay(150);
  }

  throw new Error(`Worker 준비 시간 초과\n${output}`);
};

const stop = async () => {
  const child = processHandle;
  if (!child || child.exitCode !== null || child.signalCode !== null) return;
  const exited = once(child, "exit");
  if (process.platform === "win32") child.kill("SIGTERM");
  else process.kill(-child.pid, "SIGTERM");
  await exited;
  processHandle = undefined;
};

const request = async (path, method = "GET", body) => {
  const response = await fetch(`${origin}/api/${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(5000),
  });

  return { status: response.status, body: await response.json() };
};

try {
  await start();
  assert.equal((await request("board")).body.tasks.length, 6);
  const created = await request("tasks", "POST", {
    title: "로컬 재시작 확인",
    category: "Operations",
  });
  assert.equal(created.status, 201);
  assert.equal(
    (await request(`tasks/${created.body.id}`, "PATCH", { done: true })).body
      .done,
    true,
  );
  assert.equal(
    (await request("tasks", "POST", { title: " ", category: "Design" })).status,
    400,
  );
  const concurrent = await Promise.all(
    Array.from({ length: 6 }, (_, index) =>
      request("tasks", "POST", {
        title: `동시 생성 ${index}`,
        category: "Engineering",
      }),
    ),
  );
  assert.ok(concurrent.every((result) => result.status === 201));
  assert.equal((await request("board")).body.tasks.length, 13);
  await stop();

  await start();
  const restored = (await request("board")).body;
  assert.equal(restored.tasks.length, 13);
  assert.equal(
    restored.tasks.find((task) => task.id === created.body.id)?.done,
    true,
  );
  assert.equal(restored.activity.length, 9);
  console.log(
    "로컬 workerd 검증 통과: 생성·완료·입력 거절·동시 요청·프로세스 재시작 후 복원",
  );
} finally {
  await stop();
  await rm(temporary, { recursive: true, force: true });
}
