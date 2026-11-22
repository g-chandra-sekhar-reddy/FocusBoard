import { Pencil, Trash2 } from "lucide-react";
import { STATUSES } from "../data/sampleTasks";

function formatDueDate(value) {
  if (!value) {
    return "No due date";
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusClass(status) {
  if (status === "In progress") return "is-progress";
  if (status === "Completed") return "is-completed";
  return "is-todo";
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <li className="task-card">
      <div className="task-card-top">
        <p className="category-chip">{task.category}</p>
        <p className={`priority-badge priority-${task.priority.toLowerCase()}`}>{task.priority} priority</p>
      </div>

      <h3>{task.title}</h3>
      <p className="task-description">{task.description || "No description"}</p>

      <div className="task-card-bottom">
        <label className="status-control" htmlFor={`status-${task.id}`}>
          Status
          <select
            id={`status-${task.id}`}
            className={`status-select ${statusClass(task.status)}`}
            aria-label={`Status for ${task.title}`}
            value={task.status}
            onChange={(event) => onStatusChange(task.id, event.target.value)}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <p className="due-date">
          <span>Due</span> {formatDueDate(task.dueDate)}
        </p>

        <div className="task-actions">
          <button type="button" className="icon-button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}>
            <Pencil aria-hidden="true" size={16} />
          </button>
          <button type="button" className="icon-button" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}>
            <Trash2 aria-hidden="true" size={16} />
          </button>
        </div>
      </div>
    </li>
  );
}
