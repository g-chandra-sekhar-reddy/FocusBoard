export const STATUSES = ["To do", "In progress", "Completed"];
export const PRIORITIES = ["Low", "Medium", "High"];
export const CATEGORIES = ["Design", "Development", "Testing", "Research"];
export const STATUS_FILTERS = ["All", ...STATUSES];

export const sampleTasks = [
  {
    id: "task-1001",
    title: "Refine the dashboard header",
    description: "Align the page title, date, and navigation so the desktop header matches the reference spacing.",
    category: "Design",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-24",
  },
  {
    id: "task-1002",
    title: "Build task search and status tabs",
    description: "Filter the list by title, status, and priority without keeping a second copy of the tasks.",
    category: "Development",
    status: "To do",
    priority: "Medium",
    dueDate: "2026-11-26",
  },
  {
    id: "task-1003",
    title: "Check the create-task form on a phone",
    description: "Confirm every field, the validation messages, and both actions stay usable at 390px.",
    category: "Testing",
    status: "To do",
    priority: "High",
    dueDate: "2026-11-25",
  },
  {
    id: "task-1004",
    title: "Review how saved tasks should load",
    description: "Sample tasks should appear only on the first visit. A later refresh must restore the saved list.",
    category: "Research",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-11-20",
  },
  {
    id: "task-1005",
    title: "Add edit and delete actions to each card",
    description: "Editing keeps the original id. Deleting asks for confirmation before the task is removed.",
    category: "Development",
    status: "In progress",
    priority: "Medium",
    dueDate: "2026-11-27",
  },
  {
    id: "task-1006",
    title: "Retest status changes after a refresh",
    description: "Moving a task to Completed should update the percentage and still be there after reload.",
    category: "Testing",
    status: "To do",
    priority: "Low",
    dueDate: "2026-11-28",
  },
  {
    id: "task-1007",
    title: "Note the carousel keyboard controls",
    description: "Previous, next, and the slide dots must be reachable and named for keyboard users.",
    category: "Research",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-11-21",
  },
  {
    id: "task-1008",
    title: "Adjust task card spacing",
    description: "Keep the title, badges, due date, and actions readable when the card stacks on a narrow screen.",
    category: "Design",
    status: "To do",
    priority: "High",
    dueDate: "2026-11-29",
  },
];
