import React from "react";

/**
 * Defines the toolbar of buttons on a "booked" reservation card
 */

function ReservationButtons({ confirmCancel, id }) {
  return (
    <div
      className="btn-toolbar-vertical my-2"
      role="toolbar"
      aria-label="reservation actions"
    >
      <div
        className="btn-group w-75"
        role="group"
        aria-label="Assign to Table Button"
      >
        <a href={`/reservations/${id}/seat`} className="btn btn-primary shadow">
          <span className="oi oi-arrow-circle-bottom mr-2" />
          Seat
        </a>
      </div>
      <div
        className="btn-group w-75 mt-2"
        role="group"
        aria-label="Toolbar with button groups "
      >
        <a
          href={`/reservations/${id}/edit`}
          className="btn btn-sm btn-secondary w-25 mr-1"
        >
          <span className="oi oi-pencil mr-2" />
          Edit
        </a>
        <button
          type="button"
          className="btn btn-sm btn-danger w-25 ml-1"
          onClick={confirmCancel}
          data-reservation-id-cancel={id}
        >
          <span className="oi oi-ban mr-1" />
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ReservationButtons;
