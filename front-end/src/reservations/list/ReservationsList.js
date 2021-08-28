import React from "react";
import Reservation from "../reservation/Reservation";

function ReservationsList({ reservations }) {
  console.log("ReservationsList rendered with reservations prop containing: ", [
    reservations,
  ]);

  if (!reservations.length) {
    //! TEMPORARY. same sample data that will come from backend once working correctly
    console.log("temp data IS being used ONLY while db has no response");
    //! "reservation_id" is not in this temp data and is instead being set by a generic index from map function. When backend is running, that needs to be hardcoded into each reservation as they are pushed into db. Will also need to fix prop marked at "reminder:AHTOWQ"
    reservations = [
      {
        first_name: "Rick",
        last_name: "Sanchez",
        mobile_number: "202-555-0164",
        reservation_date: "2020-12-31",
        reservation_time: "20:00:00",
        people: 6,
        created_at: "2020-12-10T08:30:32.326Z",
        updated_at: "2020-12-10T08:30:32.326Z",
      },
      {
        first_name: "Frank",
        last_name: "Palicky",
        mobile_number: "202-555-0153",
        reservation_date: "2020-12-30",
        reservation_time: "20:00",
        people: 1,
        created_at: "2020-12-10T08:31:32.326Z",
        updated_at: "2020-12-10T08:31:32.326Z",
      },
      {
        first_name: "Bird",
        last_name: "Person",
        mobile_number: "808-555-0141",
        reservation_date: "2020-12-30",
        reservation_time: "18:00",
        people: 1,
        created_at: "2020-12-10T08:31:32.326Z",
        updated_at: "2020-12-10T08:31:32.326Z",
      },
      {
        first_name: "Tiger",
        last_name: "Lion",
        mobile_number: "808-555-0140",
        reservation_date: "2025-12-30",
        reservation_time: "18:00",
        people: 3,
        created_at: "2020-12-10T08:31:32.326Z",
        updated_at: "2020-12-10T08:31:32.326Z",
      },
      {
        first_name: "Anthony",
        last_name: "Charboneau",
        mobile_number: "620-646-8897",
        reservation_date: "2026-12-30",
        reservation_time: "18:00",
        people: 2,
        created_at: "2020-12-10T08:31:32.326Z",
        updated_at: "2020-12-10T08:31:32.326Z",
      },
    ];
  }

  // reservationsList is null, and therefore will not render, until there is a reservations array with at least 1 reservation
  let reservationsList = null;

  if (reservations.length) {
    reservationsList = reservations.map((reservation, index) => (
      <li key={index}>
        <Reservation
          //! reminder:AHTOWQ
          reservation_id={index}
          first_name={reservation.first_name}
          last_name={reservation.last_name}
          mobile_number={reservation.mobile_number}
          reservation_time={reservation.reservation_time}
          people={reservation.people}
        />
      </li>
    ));
  }

  return <ul>{reservationsList ?? <li>No reservations on this date</li>}</ul>;
}

export default ReservationsList;
