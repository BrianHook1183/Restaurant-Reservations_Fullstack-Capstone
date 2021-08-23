import React from "react";
import Reservation from "../reservation/Reservation";

//TODO This file is very incomplete!!!!!!!!! trying out a return straight of the map which is also returning stuff.

function ReservationsList({ reservations }) {
  return reservations.map((reservation) => {
    return (
      <Reservation
        key={reservation.reservation_id}
        reservation_id={reservation.reservation_id}
        first_name={reservation.first_name}
        last_name={reservation.last_name}
        mobile_number={reservation.mobile_number}
        reservation_time={reservation.reservation_time}
        people={reservation.people}
      />
    );
  });
}

export default ReservationsList;
