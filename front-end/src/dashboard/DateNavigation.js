import React from "react";
import { Link } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the date navigation for the Dashboard view.
 */

function DateNavigation({ date }) {
  return (
    <nav className="nav justify-content-center" aria-label="Change date">
      <Link
        className="nav-link"
        to={`/dashboard?date=${previous(date)}`}
        aria-label="Previous"
      >
        <span aria-hidden="true">&laquo; </span>
        <span> Previous</span>
      </Link>
      <Link
        className="nav-link"
        to={`/dashboard?date=${today()}`}
        aria-label="Today"
      >
        <span>Today</span>
      </Link>
      <Link
        className="nav-link"
        to={`/dashboard?date=${next(date)}`}
        aria-label="Next"
      >
        <span>Next </span>
        <span aria-hidden="true"> &raquo;</span>
      </Link>
    </nav>
  );
}

export default DateNavigation;
