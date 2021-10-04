import React from "react";
import Table from "../table/Table";

function TablesList({ tables }) {
  let tablesList = null;

  if (tables.length) {
    tablesList = tables.map((table, index) => (
      <div className="col mb-4" key={index}>
        <div
          className={`card h-100 border-${
            table.reservation_id ? "dark" : "primary"
          }`}
        >
          <Table table={table} />
        </div>
      </div>
    ));
  }

  // if tablesList is null/undefined, will not render, until there is a tables array with at least 1 table
  // todo There needs to be a difference between loading message and an actual empty tablesList
  return (
    <div className="row row-cols-1 row-cols-md-3">
      {tablesList ?? "(...loading tables)"}
    </div>
  );
}

export default TablesList;
