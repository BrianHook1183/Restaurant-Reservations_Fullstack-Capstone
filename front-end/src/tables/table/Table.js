import React from "react";

function Table({ name, capacity, status, id }) {
  return (
    <>
      <h5 className="card-title">Table {name}</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Capacity: {capacity}</li>
        <li className="list-group-item">
          Status: <span data-table-id-status={`${id}`}>{status || "Free"}</span>
        </li>
      </ul>
    </>
  );
}

export default Table;
