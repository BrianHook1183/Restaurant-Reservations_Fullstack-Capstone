import React, { useEffect, useState } from "react";
import useQuery from "../utils/useQuery";
import { listReservations, listTables } from "../utils/api";
import formatDisplayDate from "../utils/format-display-date";
import ErrorAlert from "../layout/ErrorAlert";
import DateNavigation from "./DateNavigation";
import ReservationsList from "../reservations/list/ReservationsList";
import TablesList from "../tables/list/TablesList";

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
    date = dateInUrl;
  }

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  //TODO check if using [tables] here is best practice. it is currently clearing a "useEffect has a missing dependency" console warning
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);

    // listReservations will run every time {date} changes
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(console.log("listReservations() ran from loadDashboard()"))
      .catch(setReservationsError);

    // listTables only runs on initial loadDashboard() or if tables is empty.

      listTables(abortController.signal)
        .then(setTables)
        .then(console.log("listTables() ran from loadDashboard()"))
        .catch(setTablesError);

    return () => abortController.abort();
  }

  // convert YYYY-MM-DD to a more user-friendly format
  // const displayDate = formatDisplayDate(date);
  // const displayDateShort = formatDisplayDate(date, "short");
  const displayDateLong = formatDisplayDate(date, "long");

  return (
    <main>
      {/* <h1>Dashboard</h1> */}
      {/* <div className="d-md-flex mb-3"> */}
      <h4>{displayDateLong}</h4>
      <DateNavigation date={date} />
      {/* </div> */}
      <h2 className="mb-0">Reservations:</h2>
      <ReservationsList reservations={reservations} />
      <ErrorAlert error={reservationsError} />
      <h2 className="mb-0">Tables:</h2>
      <TablesList tables={tables} />
      <ErrorAlert error={tablesError} />
    </main>
  );
}

export default Dashboard;
