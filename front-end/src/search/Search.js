import React, { useState } from "react";
import { listReservationsByMobile } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/list/ReservationsList";

/**
 * Defines the dashboard page.
 * @returns {JSX.Element}
 */

function Search() {
  const [mobileNumber, setMobileNumber] = useState([""]);

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const handleChange = ({ target }) => {
    setMobileNumber(target.value);
  };

  let loadingMessage = "";

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);

    loadingMessage = "loading...";

    listReservationsByMobile({ mobileNumber }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    loadingMessage = "";

    return () => abortController.abort();
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Find clicked!");
    loadReservations();
  };

  const searchResults = reservations.length ? (
    <h2 className="mb-0">Search Results:</h2>
  ) : (
    loadingMessage
  );

  return (
    <main>
      <p className="text-center">...(search for a reservation)...</p>
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="form-group mx-sm-3 mb-2">
          <label className="sr-only">mobile_number</label>
          <input
            id="mobile_number"
            name="mobile_number"
            type="text"
            className="form-control"
            placeholder="Enter a customer's phone number"
            onChange={handleChange}
            value={mobileNumber}
            required={true}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Find
        </button>
      </form>
      {searchResults}
      <ReservationsList reservations={reservations} />
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Search;
