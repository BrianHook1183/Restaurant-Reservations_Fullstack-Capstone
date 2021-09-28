import React from "react";
import Reservation from "../reservation/Reservation";

function ReservationsList({ reservations }) {
  const currentReservations = [];
  const finishedReservations = [];

  // Sorts reservations so only "booked" and "seated" are rendered
  // TODO finishedReservations are being kept just in case they are needed in future
  reservations.forEach((res) => {
    if (res.reservation_status === "finished") {
      finishedReservations.push(res);
    } else {
      currentReservations.push(res);
    }
  });

  const reservationsList = currentReservations.map((res, index) => (
    <div className="col mb-4" key={index}>
      <div
        className={`card h-100 text-center border-${
          res.reservation_status === "booked" ? "primary" : "dark"
        }`}
        key={index}
      >
        <Reservation reservation={res} />
      </div>
    </div>
  ));

  // if reservationsList is null/undefined, will not render, until there is a reservations array with at least 1 reservation
  return (
    <div className="row row-cols-1 row-cols-md-3">
      {reservationsList ?? "(...no reservations on this date)"}
    </div>
  );
}

export default ReservationsList;
