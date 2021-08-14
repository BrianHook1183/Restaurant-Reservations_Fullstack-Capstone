import React from "react";

/**
 * Defines the date navigation for the Dashboard view.
 */

function DateNavigation({ date }) {
  const handleClick = (event) => {
    event.preventDefault();
    const changeDateTo = event.target.innerText;
    if (changeDateTo === "Prev") {
      console.log(
        "Prev clicked, current date was ",
        date,
        " and is now: ",
        "unknown"
      );
    }
    if (changeDateTo === "Today") {
      console.log(
        "Today clicked, current date was ",
        date,
        " and is now: ",
        "unknown"
      );
    }
    if (changeDateTo === "Next") {
      console.log(
        "Next clicked, current date was ",
        date,
        " and is now: ",
        "unknown"
      );
    }
  };

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
