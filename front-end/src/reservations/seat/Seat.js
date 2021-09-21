import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { listTables, assignToTable, getReservation } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

function Seat() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [assignTableError, setAssignTableError] = useState(null);

  const [allTables, setAllTables] = useState([]);
  const [allTablesError, setAllTablesError] = useState(null);

  const [formData, setFormData] = useState({ table_id: null });

  const [reservationDetails, setReservationDetails] = useState([]);
  const [reservationError, setReservationError] = useState(null);

  // load all tables for dropdown options
  useEffect(() => {
    const abortController = new AbortController();
    setAllTablesError(null);

    listTables(abortController.signal)
      .then(setAllTables)
      .catch(setAllTablesError);

    return () => abortController.abort();
  }, []);

  // load reservationDetails from url param
  useEffect(() => {
    const abortController = new AbortController();
    setReservationError(null);

    getReservation(reservation_id, abortController.signal)
      .then(setReservationDetails)
      .catch(setReservationError);

    return () => abortController.abort();
  }, [reservation_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setAssignTableError(null);

    assignToTable(reservation_id, formData.table_id, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(setAssignTableError);
    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // cancelling a table assignment while in progress sends user back to previous page.
    history.goBack();
  };

  return (
    <section>
      <h1>Assign Party of {reservationDetails.people} to a Table</h1>
      <ErrorAlert error={allTablesError} />
      <ErrorAlert error={reservationError} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_id">Table: </label>
        <select
          name="table_id"
          onChange={(e) => setFormData({ [e.target.name]: e.target.value })}
          required={true}
        >
          <option defaultValue>Table - Capacity</option>
          {allTables.map(({ table_id, table_name, capacity }) => (
            <option key={table_id} value={table_id}>
              {table_name} - {capacity}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
        <button type="button" value="Cancel" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <ErrorAlert error={assignTableError} />
    </section>
  );
}

export default Seat;
