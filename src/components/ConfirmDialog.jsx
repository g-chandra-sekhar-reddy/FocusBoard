import { useEffect, useId, useRef } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

export function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel }) {
  const headingId = useId();
  const cancelRef = useRef(null);
  const dialogRef = useFocusTrap({ enabled: true, initialFocusRef: cancelRef, onEscape: onCancel });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        ref={dialogRef}
        className="modal confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={`${headingId}-message`}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={headingId}>{title}</h2>
        <p id={`${headingId}-message`}>{message}</p>
        <div className="form-actions">
          <button ref={cancelRef} type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
