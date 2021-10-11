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

  const [reservations, setReservations] = useState("loading");
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState("loading");
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadReservations, [date]);
  useEffect(loadTables, []);

  function loadReservations() {
    setReservations("loading");

    const abortController = new AbortController();
    setReservationsError(null);

    // listReservations will run every time {date} changes
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  function loadTables() {
    setTables("loading");
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
      <div className="row">
        <div className="col-12 mx-auto my-3">
          <h2 className="mb-0 text-center">{displayDateLong}</h2>
          <DateNavigation date={date} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 offset-md-1 text-center wow fadeInUp">
          <fieldset className="border p-3">
            <legend className="w-auto px-2 font-weight-bold ">
              Reservations
            </legend>
            <ReservationsList reservations={reservations} />
            <ErrorAlert error={reservationsError} />
          </fieldset>
        </div>
      </div>
      <hr className="my-5 py-1 shadow bg-dark rounded" />
      <div className="row">
        <div className="col-md-10 offset-md-1 text-center wow fadeInUp">
          <fieldset className="border p-3">
            <legend className="w-auto px-2 font-weight-bold ">Tables</legend>
            <TablesList tables={tables} />
            <ErrorAlert error={tablesError} />
          </fieldset>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
