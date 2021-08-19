import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DateNavigation from "./DateNavigation";
// import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param propDate
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

// setting default value to date prop to today
function Dashboard({ propDate, handleClick, handleParams }) {
  // const params = useParams();
  // if (params.date) {
  //   date = params.date;
  // }

  const params = useParams();
  if (params.date) {
    const paramDate = params.date;
    console.log("paramDate", paramDate);

    if (paramDate !== propDate) {
      console.log("propDate: ", propDate, " paramDate: ", paramDate);
      handleParams(paramDate);
    }
  }

  // // handles clicks in DateNavigation component
  // const handleClick = (event) => {
  //   event.preventDefault();
  //   const changeDateTo = event.target.innerText;
  //   if (changeDateTo === "Prev") {
  //     const prevDate = previous(date);
  //     console.log("Previous clicked, current date was ", date);
  //     date = prevDate;
  //     console.log(" and is now: ", date);
  //   }
  //   if (changeDateTo === "Today") {
  //     const todayDate = today();
  //     console.log("Today clicked, current date was ", date);
  //     date = todayDate;
  //     console.log(" and is now: ", date);
  //   }
  //   if (changeDateTo === "Next") {
  //     const nextDate = next(date);
  //     console.log("Next clicked, current date was ", date);
  //     date = nextDate;
  //     console.log(" and is now: ", date);
  //   }
  // };

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [propDate]);

  console.log("fresh dashboard load/reload, current *date* is ", propDate);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ propDate }, abortController.signal)
      .then(console.log("date used in listReservations is: ", propDate))
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
