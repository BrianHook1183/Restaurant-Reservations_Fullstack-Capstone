import React from "react";
import Table from "../table/Table";
import LoadingWheel from "../../widgets/LoadingWheel";
import { Link } from "react-router-dom";

function TablesList({ tables }) {
  const noTablesMessage = (
    <p>
      There are no tables- create a
      <Link className="nav-link" to="/tables/new">
        New Table
      </Link>
      to correct that
    </p>
  );

  // displays while waiting for api response, and if there are 0 results
  const noTables = tables === "loading" ? <LoadingWheel /> : noTablesMessage;

  let tablesMapped;
  let tablesList = null;

  // waits for "loading" status to be replaced by a non-empty array of tables
  if (tables.length && tables !== "loading") {
    tablesMapped = tables.map((table, index) => (
      <Table table={table} key={index} />
    ));
    tablesList = <div className="card-deck">{tablesMapped}</div>;
  }

  // tablesList renders if there is at least 1 table, noTables decides between showing "loading" or "no tables"
  return tablesList ?? noTables;
}

export default TablesList;
