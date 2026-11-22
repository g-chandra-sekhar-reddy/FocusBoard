import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCheck, ListChecks, LoaderCircle, Percent } from "lucide-react";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { FocusNotes } from "./components/FocusNotes";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { StatCard } from "./components/StatCard";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { sampleTasks } from "./data/sampleTasks";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { TASKS_STORAGE_KEY, useLocalStorage } from "./hooks/useLocalStorage";

function createTaskId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage(TASKS_STORAGE_KEY, sampleTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 900px)").matches);
  const [formMode, setFormMode] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const menuButtonRef = useRef(null);
  const closeMenu = useCallback(() => setNavOpen(false), []);
  const handleMenuNavigate = useCallback(() => {
    closeMenu();
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, [closeMenu]);
  const sidebarRef = useFocusTrap({
    enabled: navOpen && isMobile,
    onEscape: closeMenu,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    function handleChange() {
      setIsMobile(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setNavOpen(false);
      }
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const closeForm = useCallback(() => {
    setFormMode(null);
    setEditingTask(null);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setPendingDelete(null);
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((task) => task.status === "In progress").length;
    const completed = tasks.filter((task) => task.status === "Completed").length;
    const completion = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, inProgress, completed, completion };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch = query === "" || task.title.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const filtersActive = search !== "" || statusFilter !== "All" || priorityFilter !== "All";

  function handleCreate(values) {
    const newTask = { id: createTaskId(), ...values };
    setTasks((current) => [newTask, ...current]);
    closeForm();
  }

  function handleUpdate(values) {
    setTasks((current) =>
      current.map((task) => (task.id === editingTask.id ? { ...task, ...values, id: task.id } : task)),
    );
    closeForm();
  }

  function handleStatusChange(id, status) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, status } : task)));
  }

  function handleConfirmDelete() {
    setTasks((current) => current.filter((task) => task.id !== pendingDelete.id));
    closeDeleteDialog();
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#dashboard">
        Skip to dashboard
      </a>
      <Sidebar sidebarRef={sidebarRef} open={navOpen} onNavigate={handleMenuNavigate} />
      {navOpen && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close navigation menu"
          tabIndex={-1}
          onClick={() => setNavOpen(false)}
        />
      )}

      <div className="app-main">
        <Header
          menuOpen={navOpen}
          menuButtonRef={menuButtonRef}
          onMenuClick={() => setNavOpen((open) => !open)}
        />
        <main className="dashboard" id="dashboard">
          <div className="dashboard-heading">
            <h1>Dashboard</h1>
            <p>See the full list, what is in progress, and how much is already completed.</p>
          </div>

          <section className="stat-grid" aria-label="Task statistics">
            <StatCard label="Total tasks" value={stats.total} detail="Every saved task" icon={ListChecks} />
            <StatCard label="In progress" value={stats.inProgress} detail="Currently being worked" icon={LoaderCircle} />
            <StatCard label="Completed" value={stats.completed} detail="Marked completed" icon={CheckCheck} />
            <StatCard label="Completion" value={`${stats.completion}%`} icon={Percent} meter={stats.completion} />
          </section>

          <FocusNotes />

          <TaskList
            tasks={filteredTasks}
            totalCount={tasks.length}
            search={search}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            filtersActive={filtersActive}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
            onResetFilters={resetFilters}
            onCreate={() => {
              setEditingTask(null);
              setFormMode("create");
            }}
            onEdit={(task) => {
              setEditingTask(task);
              setFormMode("edit");
            }}
            onDelete={setPendingDelete}
            onTaskStatusChange={handleStatusChange}
          />
        </main>
      </div>

      {formMode && (
        <TaskForm
          key={editingTask?.id ?? "create"}
          mode={formMode}
          task={editingTask}
          onCancel={closeForm}
          onSubmit={formMode === "edit" ? handleUpdate : handleCreate}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this task?"
          message={`“${pendingDelete.title}” will be removed from the board and from saved tasks.`}
          confirmLabel="Delete task"
          onConfirm={handleConfirmDelete}
          onCancel={closeDeleteDialog}
        />
      )}
    </div>
  );
}
