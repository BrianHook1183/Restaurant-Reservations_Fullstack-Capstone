import React from "react";

/**
 * Defines the date navigation for the Dashboard view.
 */

function DateNavigation({ handleClick }) {
  return (
    <div>
      <button type="button" onClick={handleClick}>
        Prev
      </button>
      <button type="button" onClick={handleClick}>
        Today
      </button>
      <button type="button" onClick={handleClick}>
        Next
      </button>
    </div>
  );
}

export default DateNavigation;
