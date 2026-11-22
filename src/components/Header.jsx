import { Menu } from "lucide-react";

const todayLabel = new Date().toLocaleDateString("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function Header({ menuOpen, menuButtonRef, onMenuClick }) {
  return (
    <header className="topbar">
      <button
        ref={menuButtonRef}
        type="button"
        className="menu-button"
        onClick={onMenuClick}
        aria-controls="sidebar"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <Menu aria-hidden="true" size={20} />
      </button>
      <p className="topbar-brand">FocusBoard</p>
      <p className="topbar-date">
        <span className="visually-hidden">Today</span>
        {todayLabel}
      </p>
    </header>
  );
}
