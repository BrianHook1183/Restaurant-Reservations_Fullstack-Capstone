import React, { useState } from "react";
import FinishTableModal from "../modals/FinishTableModal";

function Table({ table }) {
  const { table_name, table_id, capacity } = table;
  const occupied = table.reservation_id;

  const [modalStatus, setModalStatus] = useState(false);

  const displayModal = (event) => {
    event.preventDefault();
    setModalStatus(true);
  };

  let finish = null;
  if (occupied) {
    finish = (
      <button
        className="btn btn-primary"
        data-table-id-finish={`${table_id}`}
        onClick={displayModal}
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
          <FinishTableModal
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
            tableId={table_id}
          />
        </li>
      </ul>
    </div>
  );
}

export default Table;
