# FocusBoard

FocusBoard is a responsive task dashboard for planning work, updating status, and keeping a short list of focus notes. The board runs entirely in the browser. Tasks are stored with `localStorage`, so a refresh restores the latest list.

## Features

- Dashboard with total tasks, in-progress tasks, completed tasks, and completion percentage
- Statistics calculated from the current task list, including when the list is empty
- Three-slide Focus Notes carousel with previous, next, and slide buttons
- Search by task title, status tabs, and a priority filter that work together
- Create, edit, and delete tasks, with confirmation before a delete
- Status changes from each task card
- Sample tasks on the first visit only
- Layouts for mobile (390px), tablet (768px), and desktop (1440px)

## Technology stack

- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- React Hooks
- Lucide React for icons
- `localStorage` for persistence

## Project structure

```text
src/
  components/
    ConfirmDialog.jsx
    FilterTabs.jsx
    FocusNotes.jsx
    Header.jsx
    SearchBar.jsx
    Sidebar.jsx
    StatCard.jsx
    TaskCard.jsx
    TaskForm.jsx
    TaskList.jsx
  data/
    focusNotes.js
    sampleTasks.js
  hooks/
    useFocusTrap.js
    useLocalStorage.js
  App.jsx
  main.jsx
  index.css
```

`App.jsx` owns the task list and the filter state. Each component renders one part of the screen and receives data through props.

## Installation

```bash
cd FocusBoard
npm install
```

## Local development

```bash
npm run dev
```

Vite prints a local address, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

The production files are written to `dist/`. Preview that build with:

```bash
npm run preview
```

## How state is managed

There is one task array. It is the only copy of the tasks.

- `useState` inside `useLocalStorage` holds that array.
- Creating, editing, deleting, and changing a status call `setTasks` with a new array. The previous array is not changed in place.
- `useMemo` derives the statistics from the full task array. Completion percentage is `Math.round((completed / total) * 100)`. When `total` is `0`, the percentage is `0`.
- `useMemo` also derives the visible list from the same array using the search text, status tab, and priority filter. Those three controls are separate `useState` values. They are not saved, and they are not a second task list.
- `useState` in `FocusNotes` stores the active slide index. Next and previous wrap around with the remainder operator, so the last slide leads back to the first.
- `useEffect` in `useLocalStorage` writes the full task array after it changes. `useEffect` in the form and delete dialog closes them on Escape and restores page scrolling.

## localStorage

The storage key is `focusboard_tasks`.

- On startup the hook reads that key.
- If the key is missing, the sample tasks from `src/data/sampleTasks.js` are used.
- If the key exists, including an empty array, the saved value is used. Sample tasks do not replace it.
- Invalid JSON, a non-array value, or a storage error falls back to the sample tasks.
- Recognisable tasks are kept. A task with a missing or unknown status, priority, or category is given a safe value.
- Search text and filters are not stored. They are calculated from the full saved list.

To see the sample tasks again, remove the `focusboard_tasks` key in the browser devtools and refresh.

## AI usage

The AI tools and assistance used during development are documented in [AI_USAGE.md](AI_USAGE.md).

## GitHub repository

`https://github.com/g-chandra-sekhar-reddy/FocusBoard`

## Live deployment

The application is deployed using Vercel.

Live URL: https://focus-board-orpin.vercel.app

The project uses `npm run build` as the build command and `dist` as the output directory.

## Screenshots

Add captures to the `screenshots/` folder:

- `screenshots/desktop-dashboard.png` at about 1440px wide
- `screenshots/mobile-dashboard.png` at about 390px wide

## Known limitations

- The Figma frames were not in the project folder. Colors, spacing, type, and the three Focus Notes texts are a temporary stand-in. The slide copy lives in `src/data/focusNotes.js`. The colors live as variables at the top of `src/index.css`.
- Sidebar links scroll to sections on this page. There are no separate routes.
- Category is collected on the form and must be chosen. Description is optional.
- Search text, selected status tab, priority filter, and active carousel slide are not persisted.
- Task details, including due dates, are stored in localStorage and restored after refreshing the page.
- There is no account, server, or shared board. Data stays in this browser.
