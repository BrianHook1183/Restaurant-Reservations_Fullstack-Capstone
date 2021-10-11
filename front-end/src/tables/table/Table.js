import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { finishTable } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

function Table({ table }) {
  const { table_name, table_id, capacity } = table;
  const occupied = table.reservation_id;

  const history = useHistory();
  const [finishTableError, setFinishTableError] = useState(null);

  const confirmFinish = () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      setFinishTableError(null);

      finishTable(table_id, abortController.signal)
        // history.go(0) refreshes the current page (should be /dashboard) so that tables effect hook reloads
        .then(() => history.go(0))
        .catch(setFinishTableError);
      return () => abortController.abort();
    }
  };

  let finish = null;
  if (occupied) {
    finish = (
      <button
        className="btn btn-primary shadow w-75"
        data-table-id-finish={`${table_id}`}
        onClick={confirmFinish}
      >
        <span className="oi oi-check mr-2" />
        Finish
      </button>
    );
  }

  return (
    <div className="card-body">
      <h5 className="card-title">Table {table_name}</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Capacity: {capacity}</li>
        <li className="list-group-item">
          <div className={`text-center bg-${occupied ? "light" : "success"}`}>
            <h6>
              <span data-table-id-status={`${table_id}`}>
                {occupied ? "occupied" : "free"}
              </span>
            </h6>
            <ErrorAlert error={finishTableError} />
          </div>
        </li>
      </ul>
      {finish}
    </div>
  );
}

export default Table;
