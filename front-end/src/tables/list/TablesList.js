import React from "react";
import Table from "../table/Table";

function TablesList({ tables }) {
  let tablesList = null;

  if (tables.length) {
    tablesList = tables.map((table, index) => (
      <div className="col mb-4" key={index}>
        <div className="card h-100">
          <div className="card-body">
            <Table
              name={table.table_name}
              capacity={table.capacity}
              status={table.reservation_id}
              id={table.table_id}
            />
          </div>
        </div>
      </div>
    ));
  }

  // if tablesList is null/undefined, will not render, until there is a tabes array with at least 1 table
  return (
    <div className="row row-cols-1 row-cols-md-3">
      {tablesList ?? <li>No tables on this date</li>}
    </div>
  );
}

export default TablesList;
