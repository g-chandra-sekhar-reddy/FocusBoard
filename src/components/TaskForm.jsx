import { useEffect, useId, useRef, useState } from "react";
import { CATEGORIES, PRIORITIES, STATUSES } from "../data/sampleTasks";
import { useFocusTrap } from "../hooks/useFocusTrap";

const emptyForm = {
  title: "",
  description: "",
  category: "",
  status: "",
  priority: "",
  dueDate: "",
};

function validate(values) {
  const errors = {};

  if (values.title.trim() === "") {
    errors.title = "Enter a title. A title made only of spaces is not accepted.";
  }
  if (!values.category) {
    errors.category = "Choose a category.";
  }
  if (!values.status) {
    errors.status = "Choose a status.";
  }
  if (!values.priority) {
    errors.priority = "Choose a priority.";
  }
  if (!values.dueDate) {
    errors.dueDate = "Choose a due date.";
  }

  return errors;
}

export function TaskForm({ mode, task, onCancel, onSubmit }) {
  const titleId = useId();
  const titleRef = useRef(null);
  const dialogRef = useFocusTrap({ enabled: true, initialFocusRef: titleRef, onEscape: onCancel });
  const [values, setValues] = useState(() => (task ? { ...emptyForm, ...task } : emptyForm));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function updateField(field, nextValue) {
    setValues((current) => ({ ...current, [field]: nextValue }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      const fieldIds = {
        title: "task-title",
        category: "task-category",
        status: "task-status",
        priority: "task-priority",
        dueDate: "task-due-date",
      };
      document.getElementById(fieldIds[firstError])?.focus();
      return;
    }

    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category,
      status: values.status,
      priority: values.priority,
      dueDate: values.dueDate,
    });
  }

  const heading = mode === "edit" ? "Edit task" : "Create task";
  const submitLabel = mode === "edit" ? "Save changes" : "Create task";

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        ref={dialogRef}
        className="modal task-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <h2 id={titleId}>{heading}</h2>
            <p>{mode === "edit" ? "Update this task. Its id stays the same." : "Add a task to the board."}</p>
          </div>
          <button type="button" className="icon-button" onClick={onCancel} aria-label="Close form">
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          {Object.values(errors).some(Boolean) && (
            <p className="form-alert" role="alert">
              Check the highlighted fields before saving.
            </p>
          )}

          <div className="field">
            <label htmlFor="task-title">Title</label>
            <input
              ref={titleRef}
              id="task-title"
              value={values.title}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
              onChange={(event) => updateField("title", event.target.value)}
            />
            {errors.title && (
              <p id="title-error" className="field-error">
                {errors.title}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              rows={4}
              value={values.description}
              onChange={(event) => updateField("description", event.target.value)}
            />
            <p className="field-hint">Optional.</p>
          </div>

          <div className="form-grid">
            <SelectField
              id="task-category"
              label="Category"
              value={values.category}
              error={errors.category}
              onChange={(next) => updateField("category", next)}
              options={CATEGORIES}
            />
            <SelectField
              id="task-status"
              label="Status"
              value={values.status}
              error={errors.status}
              onChange={(next) => updateField("status", next)}
              options={STATUSES}
            />
            <SelectField
              id="task-priority"
              label="Priority"
              value={values.priority}
              error={errors.priority}
              onChange={(next) => updateField("priority", next)}
              options={PRIORITIES}
            />
            <div className="field">
              <label htmlFor="task-due-date">Due date</label>
              <input
                id="task-due-date"
                type="date"
                value={values.dueDate}
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? "due-date-error" : undefined}
                onChange={(event) => updateField("dueDate", event.target.value)}
              />
              {errors.dueDate && (
                <p id="due-date-error" className="field-error">
                  {errors.dueDate}
                </p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SelectField({ id, label, value, error, onChange, options }) {
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
