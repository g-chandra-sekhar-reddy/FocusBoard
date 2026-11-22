import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { focusNotes } from "../data/focusNotes";

export function FocusNotes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dotRefs = useRef([]);
  const slide = focusNotes[activeIndex];
  const count = focusNotes.length;

  function showSlide(nextIndex) {
    const wrapped = (nextIndex + count) % count;
    setActiveIndex(wrapped);
  }

  function onIndicatorKeyDown(event, index) {
    let nextIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % count;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + count) % count;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = count - 1;
    } else {
      return;
    }

    event.preventDefault();
    showSlide(nextIndex);
    dotRefs.current[nextIndex]?.focus();
  }

  return (
    <section
      id="focus-notes"
      className="focus-notes"
      aria-roledescription="carousel"
      aria-label="Focus Notes"
    >
      <div className="section-heading">
        <div>
          <h2>Focus Notes</h2>
          <p>
            Slide {activeIndex + 1} of {count}
          </p>
        </div>
      </div>

      <article
        className={`note-card note-card-${activeIndex + 1}`}
        role="group"
        aria-roledescription="slide"
        aria-label={`${activeIndex + 1} of ${count}`}
        aria-live="polite"
      >
        <p className="note-kicker">{slide.kicker}</p>
        <h3>{slide.title}</h3>
        <p>{slide.body}</p>
        <ul>
          {slide.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>

      <div className="carousel-controls">
        <button type="button" className="icon-button" onClick={() => showSlide(activeIndex - 1)} aria-label="Previous slide">
          <ChevronLeft aria-hidden="true" size={18} />
        </button>

        <div className="carousel-dots" role="group" aria-label="Choose a slide">
          {focusNotes.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                dotRefs.current[index] = element;
              }}
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              aria-label={`Show slide ${index + 1}: ${item.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => showSlide(index)}
              onKeyDown={(event) => onIndicatorKeyDown(event, index)}
            />
          ))}
        </div>

        <button type="button" className="icon-button" onClick={() => showSlide(activeIndex + 1)} aria-label="Next slide">
          <ChevronRight aria-hidden="true" size={18} />
        </button>
      </div>
    </section>
  );
}
