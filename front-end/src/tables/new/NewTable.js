import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postTable } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

/**
 * A controlled form used for creating a table
 */

function NewTable() {
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: "",
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

    const abortController = new AbortController();
    setTablesError(null);

    postTable(formData, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(setTablesError);
    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // cancelling a new table while in progress sends user back to previous page.
    history.goBack();
  };

  return (
    <section>
      <div className="d-md-flex mb-3 text-center">
        <h1 className="mb-0">New Table</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-auto">
            <div className="form-group form-row">
              <label htmlFor="table_name" className="col-md-4 col-form-label">
                Table Name:
              </label>
              <div className="col-8 pt-2">
                <input
                  id="table_name"
                  type="text"
                  name="table_name"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.table_name}
                  required={true}
                />
              </div>
            </div>
            <div className="form-group form-row">
              <label htmlFor="capacity" className="col-md-4 col-form-label">
                Capacity:
              </label>
              <div className="col-4 col-sm-2 pt-2">
                <input
                  id="capacity"
                  type="number"
                  name="capacity"
                  className="form-control"
                  onChange={handleChange}
                  required={true}
                  min="1"
                  value={formData.capacity}
                />
              </div>
            </div>
            <div className="btn-group" role="group" aria-label="form actions">
              <button
                type="button"
                value="Cancel"
                className="btn btn-secondary mr-4"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      <ErrorAlert error={tablesError} />
    </section>
  );
}

export default NewTable;
