import React from "react";
import Reservation from "../reservation/Reservation";

function ReservationsList({ reservations }) {
  let reservationsList = null;

  if (reservations.length) {
    reservationsList = reservations.map((reservation, index) => (
      <div className="col mb-4" key={index}>
        <div
          className={`card h-100 text-center border-${
            reservation.reservation_status === "booked" ? "primary" : "dark"
          }`}
          key={index}
        >
          <Reservation reservation={reservation} />
        </div>
      </div>
    ));
  }

  // if reservationsList is null/undefined, will not render, until there is a reservations array with at least 1 reservation
  return (
    <div className="row row-cols-1 row-cols-md-3">
      {reservationsList ?? "(...no reservations on this date)"}
    </div>
  );
}

export default ReservationsList;
