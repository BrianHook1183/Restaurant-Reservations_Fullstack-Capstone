import React from "react";
import Reservation from "../reservation/Reservation";

function ReservationsList({ reservations }) {
  let reservationsList = null;

  if (reservations.length) {
    reservationsList = reservations.map((reservation, index) => (
      <div className="card text-center" key={index}>
        <Reservation reservation={reservation} />
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
