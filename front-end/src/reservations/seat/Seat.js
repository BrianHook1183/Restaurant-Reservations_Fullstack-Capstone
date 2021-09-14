import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { listTables, assignToTable } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

function Seat() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [assignTableError, setAssignTableError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // load all tables
  useEffect(() => {
    const abortController = new AbortController();
    setTablesError(null);

    listTables(abortController.signal)
      .then(setTables)
      .then(console.log("Seat ran listTables()"))
      .catch(setTablesError);

    return () => abortController.abort();
  }, []);

  //! dev only
  console.log(tables);

  const initialFormState = {
    table_id: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({ [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setAssignTableError(null);

    assignToTable(reservation_id, formData.table_id, abortController.signal)
      .then(
        console.log(
          `SEAT reservation ${reservation_id} was assigned to table ${formData.table_id}`
        )
      )
      .then(() => history.push(`/dashboard`))
      .catch(setAssignTableError);
    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // cancelling a table assignment while in progress sends user back to previous page.
    history.goBack();
  };

  const tableOptions = tables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <section>
      <h1>Assign Table (reservation {reservation_id})</h1>
      <ErrorAlert error={tablesError} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_id">Table: </label>
        <select name="table_id" onChange={handleChange} required={true}>
          <option defaultValue>Table - Capacity</option>
          {tableOptions}
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
