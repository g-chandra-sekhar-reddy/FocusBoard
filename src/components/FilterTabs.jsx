import { useRef } from "react";
import { PRIORITIES, STATUS_FILTERS } from "../data/sampleTasks";

export function FilterTabs({ value, onChange }) {
  const tabRefs = useRef([]);

  function handleKeyDown(event, index) {
    let nextIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % STATUS_FILTERS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + STATUS_FILTERS.length) % STATUS_FILTERS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = STATUS_FILTERS.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    tabRefs.current[nextIndex]?.focus();
    onChange(STATUS_FILTERS[nextIndex]);
  }

  return (
    <div className="filter-tabs" role="tablist" aria-label="Filter by status">
      {STATUS_FILTERS.map((status, index) => {
        const selected = value === status;
        return (
          <button
            key={status}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`status-filter-tab-${index}`}
            aria-controls="task-results"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={selected ? "is-selected" : ""}
            onClick={() => onChange(status)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}

export function PriorityFilter({ value, onChange }) {
  return (
    <div className="priority-filter">
      <label htmlFor="priority-filter">Priority</label>
      <select id="priority-filter" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="All">All priorities</option>
        {PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
    </div>
  );
}
