import React from "react";
import { Link } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the date navigation for the Dashboard view.
 */

function DateNavigation({ date }) {
  return (
    <>
      <Link to={`/dashboard?date=${previous(date)}`}>
        <button type="button">Previous</button>
      </Link>
      <Link to={`/dashboard?date=${today()}`}>
        <button type="button">Today</button>
      </Link>
      <Link to={`/dashboard?date=${next(date)}`}>
        <button type="button">Next</button>
      </Link>
    </>
  );
}

export default DateNavigation;
