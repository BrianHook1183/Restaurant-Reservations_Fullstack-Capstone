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

  const initialMessage = "awaiting orders from the human...";
  const [resultsMessage, setResultsMessage] = useState(initialMessage);

  const handleChange = ({ target }) => {
    setMobileNumber(target.value);
  };

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);
    setResultsMessage("...searching as fast as I can!");
    listReservationsByMobile(mobileNumber, abortController.signal)
      .then(setReservations)
      .then(setResultsMessage("No reservations found"))
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    loadReservations();
  };

  const searchResults = (
    <h6 className="mt-5">
      {reservations.length ? "Search Results:" : resultsMessage}
    </h6>
  );

  return (
    <main>
      <div className="d-md-flex mb-3">
        <h1 className="mb-0">Find a Reservation</h1>
      </div>
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="form-group mx-sm-3 mb-2">
          <label className="sr-only">mobile_number</label>
          <input
            id="mobile_number"
            name="mobile_number"
            type="phone"
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
