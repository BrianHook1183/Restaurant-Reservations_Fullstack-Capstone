import React from "react";
import { Link } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the date navigation for the Dashboard view.
 */

function DateNavigation({ date }) {
  return (
    <>
      <h6 className="text-center mt-3 text-monospace">Date Navigation</h6>
      <nav className="nav mb-2 justify-content-center" aria-label="Change date">
        <Link
          className="nav-link border border-left-0 border-secondary text-center"
          to={`/dashboard?date=${previous(date)}`}
          aria-label="Previous"
        >
          <span aria-hidden="true" className="font-size-12 font-weight-bold">
            &laquo;{" "}
          </span>
          <span> Previous</span>
        </Link>
        <Link
          className="nav-link border border-top-0 border-primary mx-3 px-2 text-center"
          to={`/dashboard?date=${today()}`}
          aria-label="Today"
        >
          <span>Today</span>
        </Link>
        <Link
          className="nav-link  border border-right-0 border-secondary text-center"
          to={`/dashboard?date=${next(date)}`}
          aria-label="Next"
        >
          <span>Next </span>
          <span aria-hidden="true" className="font-weight-bold">
            {" "}
            &raquo;
          </span>
        </Link>
      </nav>
    </>
  );
}

export default DateNavigation;
