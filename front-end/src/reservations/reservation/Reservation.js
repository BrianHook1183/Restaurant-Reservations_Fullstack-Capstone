import React from "react";

function Reservation({ reservation }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_time,
    people,
    reservation_status,
  } = reservation;
  const statusStyles = {
    booked: "danger",
    seated: "success",
    finished: "muted",
  };

  const statusStyle = statusStyles[reservation_status];

  const seatBtnIfBooked =
    reservation_status !== "booked" ? null : (
      <a
        href={`/reservations/${reservation_id}/seat`}
        className="btn btn-primary"
      >
        Seat
      </a>
    );

  return (
    <>
      <div className="card-header">{reservation_time}</div>
      <div className="card-body">
        <h5 className="card-title">
          "{last_name}, party of {people}!"
        </h5>
        <p className="card-text">
          Contact: {first_name} {last_name}, {mobile_number}
        </p>
        {seatBtnIfBooked}
      </div>
      <div className="card-footer">
        {`Status: `}
        <span
          className={`text-${statusStyle}`}
          data-reservation-id-status={reservation_id}
        >
          {reservation_status}
        </span>
        <p>(res_id #{reservation_id})</p>
      </div>
    </>
  );
}

export default Reservation;
