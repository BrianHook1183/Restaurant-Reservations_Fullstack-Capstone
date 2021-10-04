import React from "react";

/**
 * Defines the toolbar of buttons on a reservation card
 */

function ReservationButtons({ confirmCancel, id }) {
  return (
    <div
      className="btn-toolbar justify-content-between"
      role="toolbar"
      aria-label="reservation actions"
    >
      <div
        className="btn-group"
        role="group"
        aria-label="Seat Reservation Button"
      >
        <a href={`/reservations/${id}/seat`} className="btn btn-primary">
          Seat
        </a>
      </div>
      <div
        className="btn-group-sm"
        role="group"
        aria-label="Modify Reservation actions"
      >
        <a href={`/reservations/${id}/edit`} className="btn btn-secondary mr-2">
          Edit
        </a>
        <button
          className="btn btn-danger"
          onClick={confirmCancel}
          data-reservation-id-cancel={id}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ReservationButtons;
