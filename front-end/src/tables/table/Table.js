import React from "react";

function Table({ table }) {
  const { table_name, table_id, capacity } = table;
  const status = table.reservation_id;

  return (
    <div className="card-body">
      <h5 className="card-title">Table {table_name}</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Capacity: {capacity}</li>
        <li className="list-group-item">
          <div className={`bg-${status ? "danger" : "success"}`}>
            <h6 className="text-center" data-table-id-status={table_id}>
              {status ? "Occupied" : "Free"}
            </h6>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Table;
