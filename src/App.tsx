import { useState, type FormEvent } from "react"
import { NavLink, Route, Routes } from "react-router"
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Circle,
  Layers,
  LayoutDashboard,
  ListChecks,
  Radio,
  Plus,
  X,
  Command,
  Activity,
  Rocket,
} from "lucide-react"
import { useBoard, useTaskMutation } from "./api"
import type { Board } from "../core/domain/board"
import type { Task } from "../core/domain/task"
import { calculateReadiness as readiness } from "../core/domain/readiness"
import { useFilters } from "./store"
import { Button } from "./components/ui/button"

function TaskForm({ close }: { close: () => void }) {
  const mutation = useTaskMutation()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<Task["category"]>("Engineering")

  function submit(e: FormEvent) {
    e.preventDefault()
    mutation.mutate({ title, category }, { onSuccess: close })
  }

  return (
    <section className="task-form" aria-label="Add launch check">
      <div className="section-title">
        <h3>A little more confidence.</h3>
        <Button variant="ghost" aria-label="Close form" onClick={close}>
          <X size={18} />
        </Button>
      </div>
      <form onSubmit={submit}>
        <label>
          Check title
          <input
            autoFocus
            required
            minLength={3}
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to happen before launch?"
          />
        </label>
        <label>
          Workstream
          <select value={category} onChange={(e) => setCategory(e.target.value as Task["category"])}>
            <option>Engineering</option>
            <option>Design</option>
            <option>Operations</option>
          </select>
        </label>
        {mutation.error && <p role="alert">{mutation.error.message}</p>}
        <Button disabled={mutation.isPending}>
          {mutation.isPending ? "Adding…" : "Add check"}
          <ArrowRight size={16} />
        </Button>
      </form>
    </section>
  )
}

function Checklist({ board }: { board: Board }) {
  const { category, setCategory } = useFilters()
  const mutation = useTaskMutation()
  const [adding, setAdding] = useState(false)
  const tasks = board.tasks.filter((t) => category === "All" || t.category === category)

  return (
    <section className="panel checklist">
      <div className="section-title">
        <div>
          <span className="eyebrow">THE FINISHING TOUCHES</span>
          <h2>
            Launch checklist <span className="count">{board.tasks.length}</span>
          </h2>
        </div>
        <Button variant="outline" onClick={() => setAdding(true)}>
          <Plus size={16} />
          Add check
        </Button>
      </div>
      <div className="filters" aria-label="Filter workstream">
        {["All", "Engineering", "Design", "Operations"].map((c) => (
          <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>
      {adding && <TaskForm close={() => setAdding(false)} />}
      {mutation.error && (
        <p role="alert" className="error">
          {mutation.error.message}
        </p>
      )}
      <div className="task-list">
        {tasks.map((task) => (
          <div className={`task ${task.done ? "done" : ""}`} key={task.id}>
            <button
              className="task-toggle"
              aria-label={`${task.done ? "Reopen" : "Complete"} ${task.title}`}
              aria-pressed={task.done}
              disabled={mutation.isPending}
              onClick={() => mutation.mutate({ id: task.id, done: !task.done })}
            >
              {task.done ? <Check size={15} /> : <Circle size={18} />}
            </button>
            <span className="task-title">{task.title}</span>
            <span className={`tag ${task.category.toLowerCase()}`}>{task.category}</span>
          </div>
        ))}
        {!tasks.length && <p className="empty">Nothing here yet. Add the first check for this workstream.</p>}
      </div>
      <footer className="panel-footer">
        <span>
          <span className="tiny-dot" />
          Every detail makes a difference.
        </span>
        <span>{readiness(board.tasks).complete} completed</span>
      </footer>
    </section>
  )
}

function Feed({ board }: { board: Board }) {
  return (
    <section className="panel feed">
      <div className="section-title">
        <div>
          <span className="eyebrow">MAKING MOVES</span>
          <h2>Recent activity</h2>
        </div>
        <Activity size={19} />
      </div>
      <ol>
        {board.activity.map((event, i) => (
          <li key={event.id}>
            <span className={`event-dot ${i === 0 ? "latest" : ""}`} />
            <div>
              <p>{event.message}</p>
              <time dateTime={event.at}>
                {new Date(event.at).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Overview({ board }: { board: Board }) {
  const progress = readiness(board.tasks)
  const remaining = progress.total - progress.complete

  return (
    <>
      <section className="hero">
        <div>
          <span className="pill">
            <span className="tiny-dot" />
            RELEASE IN PROGRESS
          </span>
          <h2>
            A thoughtful launch.
            <br />
            <span>Nothing left to chance.</span>
          </h2>
          <p>Your team’s next big thing, one small check at a time.</p>
          <button
            type="button"
            className="hero-link"
            onClick={() => document.getElementById("checklist")?.scrollIntoView()}
          >
            Let’s get launch-ready <ArrowRight size={17} />
          </button>
        </div>
        <div className="orbit" aria-label={`${progress.percent}% launch readiness`}>
          <div
            className="orbit-ring"
            style={{
              background: `conic-gradient(#cced9b ${progress.percent}%, #ffffff18 0)`,
            }}
          >
            <div>
              <span className="orbit-icon">
                <Rocket size={21} />
              </span>
              <strong>
                {progress.percent}
                <small>%</small>
              </strong>
              <span>READY FOR TAKEOFF</span>
            </div>
          </div>
          <span className="orbit-label">ONE STEP CLOSER ↗</span>
        </div>
      </section>
      <section className="stats">
        <div>
          <span>
            Launch readiness <ArrowUpRight size={16} />
          </span>
          <strong>
            {progress.percent}
            <small>%</small>
          </strong>
          <p>{progress.percent === 100 ? "All checks complete" : "Progress you can feel"}</p>
        </div>
        <div>
          <span>
            Checks completed <ListChecks size={16} />
          </span>
          <strong>
            {progress.complete}
            <small> / {progress.total}</small>
          </strong>
          <p>A little closer to the finish line</p>
        </div>
        <div>
          <span>
            Open checks <Radio size={16} />
          </span>
          <strong>
            {remaining.toString().padStart(2, "0")}{" "}
            <em className={remaining ? "" : "ready"}>{remaining ? "Needs attention" : "Ready"}</em>
          </strong>
          <p>{remaining ? "A few things to wrap up" : "Ready for a human release decision"}</p>
        </div>
      </section>
      <div className="content-grid" id="checklist">
        <Checklist board={board} />
        <div className="right-column">
          <div className="note">
            <span>THE LAUNCH NOTE</span>
            <h3>
              Great releases
              <br />
              are a team sport.
            </h3>
            <p>
              Keep the details visible.
              <br />
              Give everyone room to do their best work.
            </p>
            <Layers size={35} strokeWidth={1} />
          </div>
          <Feed board={board} />
        </div>
      </div>
    </>
  )
}

export default function App() {
  const board = useBoard()

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/">
          <span className="brand-icon">
            <Layers size={22} />
          </span>
          launchboard<span className="brand-period">.</span>
        </NavLink>
        <div className="workspace">
          <span className="workspace-avatar">S</span>
          <div>
            Studio workspace<small>Personal · Demo</small>
          </div>
          <span className="workspace-menu">⌄</span>
        </div>
        <p className="nav-caption">WORKSPACE</p>
        <nav>
          <NavLink to="/" end>
            <LayoutDashboard size={18} />
            Overview
          </NavLink>
          <NavLink to="/checks">
            <ListChecks size={18} />
            Launch checks
          </NavLink>
          <NavLink to="/activity">
            <Activity size={18} />
            Activity
          </NavLink>
        </nav>
        <div className="sidebar-bottom">
          <div className="demo-box">
            <span className="tiny-dot" /> A safe place to experiment
            <p>Mock API is on. Changes reset when this page reloads.</p>
          </div>
          <div className="profile">
            <span className="avatar">YO</span>
            <div>
              Your workspace<small>Make something good.</small>
            </div>
          </div>
        </div>
      </aside>
      <main>
        <header>
          <span>
            Workspace <span className="slash">/</span> <strong>Project Atlas</strong>
          </span>
          <span className="header-right">
            <span className="demo-badge">MSW DEMO</span>
            <Command size={16} />
          </span>
        </header>
        <div className="page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">SMALL DETAILS. BIG MOMENTS.</span>
              <h1>
                Let’s ship something good<span>.</span>
              </h1>
              <p>A clear view of everything between here and launch.</p>
            </div>
            <span className="project-badge">
              <span className="tiny-dot" />
              Project Atlas <span>v1.0</span>
            </span>
          </div>
          {board.isPending ? (
            <div className="state" role="status">
              Gathering your launch details…
            </div>
          ) : board.isError ? (
            <div className="state" role="alert">
              <h2>Couldn’t load the workspace.</h2>
              <p>{board.error.message}</p>
              <Button onClick={() => board.refetch()}>Try again</Button>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Overview board={board.data} />} />
              <Route path="/checks" element={<Checklist board={board.data} />} />
              <Route path="/activity" element={<Feed board={board.data} />} />
              <Route
                path="*"
                element={
                  <div className="state">
                    <h2>This page drifted off course.</h2>
                    <NavLink to="/">Back to overview</NavLink>
                  </div>
                }
              />
            </Routes>
          )}
          <footer className="page-footer">
            <span>BUILT FOR THE MOMENT BEFORE WHAT’S NEXT.</span>
            <span>Launchboard / 001</span>
          </footer>
        </div>
      </main>
    </div>
  )
}
