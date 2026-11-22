import { Plus } from "lucide-react";
import { FilterTabs, PriorityFilter } from "./FilterTabs";
import { STATUS_FILTERS } from "../data/sampleTasks";
import { SearchBar } from "./SearchBar";
import { TaskCard } from "./TaskCard";

export function TaskList({
  tasks,
  totalCount,
  search,
  statusFilter,
  priorityFilter,
  filtersActive,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onResetFilters,
  onCreate,
  onEdit,
  onDelete,
  onTaskStatusChange,
}) {
  const emptyTitle = totalCount === 0 ? "No tasks yet" : "No matching tasks";
  const emptyBody =
    totalCount === 0
      ? "Create a task and it will appear here. The statistics update from the same list."
      : "Nothing in the saved list matches this search and these filters.";
  const selectedTabIndex = STATUS_FILTERS.indexOf(statusFilter);

  return (
    <section id="tasks" className="task-section" aria-labelledby="tasks-heading">
      <div className="section-heading">
        <div>
          <h2 id="tasks-heading">Tasks</h2>
          <p>
            {tasks.length} shown · {totalCount} total
          </p>
        </div>
        <button type="button" className="primary-button" onClick={onCreate}>
          <Plus aria-hidden="true" size={18} />
          Create task
        </button>
      </div>

      <div className="toolbar">
        <SearchBar value={search} onChange={onSearchChange} onClear={() => onSearchChange("")} />
        <FilterTabs value={statusFilter} onChange={onStatusChange} />
        <PriorityFilter value={priorityFilter} onChange={onPriorityChange} />
        <button type="button" className="secondary-button" onClick={onResetFilters} disabled={!filtersActive}>
          Reset filters
        </button>
      </div>

      <div
        id="task-results"
        role="tabpanel"
        aria-labelledby={`status-filter-tab-${selectedTabIndex}`}
        tabIndex={0}
      >
        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>{emptyTitle}</h3>
            <p>{emptyBody}</p>
            {filtersActive && (
              <button type="button" className="secondary-button" onClick={onResetFilters}>
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onTaskStatusChange}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
