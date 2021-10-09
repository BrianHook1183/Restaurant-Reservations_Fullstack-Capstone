import React from "react";
import Reservation from "../reservation/Reservation";

function ReservationsList({ reservations }) {
  const currentReservations = [];
  const finishedReservations = [];

  //  ensures finished reservations do not render
  reservations.forEach((res) => {
    // if (res.status === "finished") {
    if (["finished", "cancelled"].includes(res.status)) {
      finishedReservations.push(res);
    } else {
      currentReservations.push(res);
    }
  });

  const reservationsList = currentReservations.map((res, index) => (
    <Reservation key={index} reservation={res} />
  ));

  // if reservationsList is null/undefined, will not render, until there is a reservations array with at least 1 reservation
  return (
    <div className="card-deck">
      {reservationsList ?? "(...no reservations on this date)"}
    </div>
  );
}

export default ReservationsList;
