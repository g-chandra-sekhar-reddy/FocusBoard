import { LayoutDashboard, ListTodo, NotebookPen } from "lucide-react";

const links = [
  { href: "#dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "#tasks", label: "Tasks", icon: ListTodo },
  { href: "#focus-notes", label: "Focus Notes", icon: NotebookPen },
];

export function Sidebar({ open, sidebarRef, onNavigate }) {
  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${open ? "is-open" : ""}`}
      id="sidebar"
      aria-label="Primary"
      tabIndex={-1}
    >
      <a className="brand" href="#dashboard" onClick={onNavigate}>
        <span className="brand-mark" aria-hidden="true">
          F
        </span>
        <span>FocusBoard</span>
      </a>

      <nav className="side-nav" aria-label="Sections">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.href} href={link.href} onClick={onNavigate}>
              <Icon aria-hidden="true" size={18} />
              {link.label}
            </a>
          );
        })}
      </nav>

      <p className="side-note">Tasks stay in this browser. Refresh the page and the saved list comes back.</p>
    </aside>
  );
}
