import React from "react";

/**
 * Defines the date navigation for the Dashboard view.
 */

function DateNavigation({ handleClick }) {
  //TODO
  /* 
  * display next, previous, and today buttons 
  TODO that allow the user to see reservations on other dates
  */

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
