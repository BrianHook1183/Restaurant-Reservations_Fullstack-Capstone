import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postTable } from "../../utils/api";
import { today } from "../../utils/date-time";
import ErrorAlert from "../../layout/ErrorAlert";

/**
 * A controlled form used for creating a table
 */

function NewTable() {
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: 1,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    let value = target.value;

    // Fixes issue of *capacity* changing into a string
    if (target.name === "capacity" && typeof value === "string") {
      value = +value;
    }

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `will POST table ${formData.table_name}, capacity: ${formData.capacity}`
    );

    const abortController = new AbortController();
    setTablesError(null);

    postTable(formData, abortController.signal)
      .then(
        console.log(
          `POSTed table ${formData.table_name}, capacity: ${formData.capacity}`
        )
      )
      .then(() => history.push(`/dashboard?date=${today()}`))
      .catch(setTablesError);
    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // cancelling a new reservation while in progress sends user back to previous page.
    history.goBack();
  };

  return (
    <main>
      <div className="d-md-flex mb-3">
        <h1 className="mb-0">Add a New Table</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_name">
          Table Name:
          <input
            id="table_name"
            type="text"
            name="table_name"
            onChange={handleChange}
            value={formData.table_name}
            required={true}
          />
        </label>
        <br />
        <label htmlFor="capacity">
          Capacity:
          <input
            id="capacity"
            type="number"
            name="capacity"
            onChange={handleChange}
            required={true}
            min="1"
            value={formData.capacity}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="button" value="Cancel" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <ErrorAlert error={tablesError} />
    </main>
  );
}

export default NewTable;
