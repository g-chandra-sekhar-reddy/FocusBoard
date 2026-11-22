import { Search, X } from "lucide-react";

export function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-bar">
      <label htmlFor="task-search">Search tasks</label>
      <div className="search-field">
        <Search aria-hidden="true" size={18} />
        <input
          id="task-search"
          type="search"
          value={value}
          placeholder="Search by title"
          onChange={(event) => onChange(event.target.value)}
        />
        {value && (
          <button type="button" className="icon-button" onClick={onClear} aria-label="Clear search">
            <X aria-hidden="true" size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
