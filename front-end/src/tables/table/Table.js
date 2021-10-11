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
        className="btn btn-primary shadow w-75 mb-3"
        data-table-id-finish={`${table_id}`}
        onClick={confirmFinish}
      >
        <span className="oi oi-check mr-2" />
        Finish
      </button>
    );
  }

  return (
    <div
      className={`card h-100 text-center border-${
        table.reservation_id ? "dark" : "primary"
      }`}
      style={{ minWidth: "14rem", maxWidth: "14rem" }}
    >
      <h4 className="card-header">Table {table_name}</h4>
      <div className="card-body p-0">
        <div className={`text-monospace py-1`}>
          {`Status: `}
          <span
            className={`text-${
              occupied ? "secondary" : "success font-weight-bold"
            }`}
            data-table-id-status={`${table_id}`}
          >
            {occupied ? "occupied" : "free"}
          </span>
        </div>
        <p className={`card-text mb-3`}>
          Capacity:{" "}
          <span
            className={`text-${
              occupied ? "secondary" : "success font-weight-bold"
            }`}
          >
            {capacity}
          </span>
        </p>
        {finish}
        <ErrorAlert error={finishTableError} />
      </div>
    </div>
  );
}

export default Table;
