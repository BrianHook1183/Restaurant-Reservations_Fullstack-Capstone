import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DateNavigation from "./DateNavigation";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

// setting default value to date prop to today
function Dashboard({ date = today() }) {
  const params = useParams();
  if (params.date) {
    date = params.date;
  }

  // handles clicks in DateNavigation component
  const handleClick = (event) => {
    event.preventDefault();
    const changeDateTo = event.target.innerText;
    if (changeDateTo === "Prev") {
      const prevDate = previous(date);
      console.log("Previous clicked, current date was ", date);
      date = prevDate;
      console.log(" and is now: ", date);
    }
    if (changeDateTo === "Today") {
      const todayDate = today();
      console.log("Today clicked, current date was ", date);
      date = todayDate;
      console.log(" and is now: ", date);
    }
    if (changeDateTo === "Next") {
      const nextDate = next(date);
      console.log("Next clicked, current date was ", date);
      date = nextDate;
      console.log(" and is now: ", date);
    }
  };

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  console.log("fresh dashboard load/reload, current *date* is ", date);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(console.log("date used in listReservations is: ", date))
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

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
