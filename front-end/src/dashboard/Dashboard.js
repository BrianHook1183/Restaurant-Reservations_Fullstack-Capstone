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

  useEffect(loadReservations, [date]);
  useEffect(loadTables, []);

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);

    // listReservations will run every time {date} changes
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);

    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  // convert YYYY-MM-DD to a more user-friendly format
  // const displayDate = formatDisplayDate(date);
  // const displayDateShort = formatDisplayDate(date, "short");
  const displayDateLong = formatDisplayDate(date, "long");

  return (
    <main>
      <h4>{displayDateLong}</h4>
      <DateNavigation date={date} />
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
