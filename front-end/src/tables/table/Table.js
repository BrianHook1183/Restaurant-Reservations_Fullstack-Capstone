import React from "react";

function Table({ table }) {
  const { table_name, table_id, capacity } = table;
  const occupied = table.reservation_id;

  let finish = null;
  if (occupied) {
    finish = (
      <button
        className="btn btn-primary"
        data-table-id-finish={`${table_id}`}
        onClick={}
      >
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
          <div className={`bg-${occupied ? "light" : "success"}`}>
            <h6 className="text-center" data-table-id-status={`${table_id}`}>
              {occupied ? "occupied" : "free"}
            </h6>
          </div>
        </li>
        <li className="list-group-item">
          <h6 className="text-center">{finish}</h6>
        </li>
      </ul>
    </div>
  );
}

export default Table;
