import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DateNavigation from "./DateNavigation";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  // handles clicks in DateNavigation component
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

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
        <DateNavigation handleClick={handleClick} />
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
