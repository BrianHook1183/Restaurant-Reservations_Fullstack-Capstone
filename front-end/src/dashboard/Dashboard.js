import React, { useEffect, useState } from "react";
import useQuery from "../utils/useQuery";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DateNavigation from "./DateNavigation";
import ReservationsList from "../reservations/list/ReservationsList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  // date is passed from Routes.js as today()
  // IF there is a date provided in URL, then  = date
  const dateInUrl = useQuery().get("date");
  if (dateInUrl) {
    console.log("dateInUrl is: ", dateInUrl);
    date = dateInUrl;
  }

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
        <h4 className="mb-0">Reservations for {date}</h4>
        <DateNavigation date={date} />
      </div>
      <ReservationsList reservations={reservations} />
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
