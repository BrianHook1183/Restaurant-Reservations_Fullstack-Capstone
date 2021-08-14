import React from "react";

/**
 * Defines the date navigation for the Dashboard view.
 */

function DateNavigation() {
  const handleClick = (event) => {
    event.preventDefault();
    const changeDateTo = event.target.innerText;
    console.log("Nav clicked. which one?: ", changeDateTo);
  };

  //TODO
  /* 
display next, previous, and today buttons that allow the user to see reservations on other dates
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
