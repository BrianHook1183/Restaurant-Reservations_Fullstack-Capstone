import React from "react";

function Table({ name, capacity, status, id }) {
  return (
    <>
      <h5 className="card-title">Table {name}</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Capacity: {capacity}</li>
        <li className="list-group-item">
          <div
            className={`bg-${status ? "danger" : "success"}`}
            data-table-id-status={`${id}`}
          >
            <h6 className="text-center">{status ? "Occupied" : "Free"}</h6>
          </div>
        </li>
      </ul>
    </>
  );
}

export default Table;
