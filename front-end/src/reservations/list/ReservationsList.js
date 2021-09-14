import React from "react";
import Reservation from "../reservation/Reservation";

function ReservationsList({ reservations }) {
  let reservationsList = null;

  if (reservations.length) {
    reservationsList = reservations.map((reservation, index) => (
      <div className="card text-center" key={index}>
        <Reservation
          reservation_id={reservation.reservation_id}
          reservation_date={reservation.date}
          first_name={reservation.first_name}
          last_name={reservation.last_name}
          mobile_number={reservation.mobile_number}
          reservation_time={reservation.reservation_time}
          people={reservation.people}
        />
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
