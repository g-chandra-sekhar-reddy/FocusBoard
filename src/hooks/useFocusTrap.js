import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap({ enabled, initialFocusRef, onEscape }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const returnFocusTo = document.activeElement;
    const getFocusableElements = () =>
      Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (element) =>
          !element.hasAttribute("hidden") &&
          element.getAttribute("aria-hidden") !== "true" &&
          element.getClientRects().length > 0,
      );
    const getInitialFocusTarget = () => initialFocusRef?.current ?? getFocusableElements()[0] ?? container;

    getInitialFocusTarget().focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements();
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (!first) {
        event.preventDefault();
        container.focus();
      } else if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }

    function handleFocusIn(event) {
      if (!container.contains(event.target)) {
        getInitialFocusTarget().focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);

      if (
        returnFocusTo instanceof HTMLElement &&
        returnFocusTo.isConnected &&
        returnFocusTo.getClientRects().length > 0
      ) {
        returnFocusTo.focus();
      }
    };
  }, [enabled, initialFocusRef, onEscape]);

  return containerRef;
}
