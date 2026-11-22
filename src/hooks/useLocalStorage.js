import { useEffect, useState } from "react";
import { CATEGORIES, PRIORITIES, STATUSES } from "../data/sampleTasks";

export const TASKS_STORAGE_KEY = "focusboard_tasks";

function normalizeTask(value, index) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const id = typeof value.id === "string" && value.id.trim() ? value.id : `recovered-${index}`;
  const title = typeof value.title === "string" ? value.title : "Untitled task";
  const description = typeof value.description === "string" ? value.description : "";
  const category = CATEGORIES.includes(value.category) ? value.category : "Research";
  const status = STATUSES.includes(value.status) ? value.status : "To do";
  const priority = PRIORITIES.includes(value.priority) ? value.priority : "Medium";
  const dueDate = typeof value.dueDate === "string" ? value.dueDate : "";

  return { id, title, description, category, status, priority, dueDate };
}

function readTasks(key, initialValue) {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored === null) {
      return initialValue;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return initialValue;
    }

    const seen = new Set();
    const tasks = [];

    parsed.forEach((item, index) => {
      const task = normalizeTask(item, index);
      if (!task || seen.has(task.id)) {
        return;
      }
      seen.add(task.id);
      tasks.push(task);
    });

    return tasks;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readTasks(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Private mode or a full storage quota should not crash the dashboard.
    }
  }, [key, value]);

  return [value, setValue];
}
