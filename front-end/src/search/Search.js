import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/list/ReservationsList";

/**
 * Defines the dashboard page.
 * @returns {JSX.Element}
 */

function Search() {
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [formError, setFormError] = useState(null);

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadReservations, [phoneNumber]);

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);

    // listReservations will run every time {phone number} changes
    listReservations({ phoneNumber }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("search submit clicked!");
  };

  const searchResults = reservations.length ? (
    <>
      <h2 className="mb-0">Search Results:</h2>
      <ReservationsList reservations={reservations} />
    </>
  ) : null;

  return (
    <main>
      <p>search for reservation by phone</p>
      <form onSubmit={handleSubmit}>
        <label>
          <input placeholder="phone number" />
        </label>
        <ErrorAlert error={formError} />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {searchResults}
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Search;
