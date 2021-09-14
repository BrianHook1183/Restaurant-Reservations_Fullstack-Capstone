import React from "react";

function Reservation({
  reservation_id,
  first_name,
  last_name,
  mobile_number,
  reservation_time,
  people,
}) {
  //TODO apply dynamic logic
  let status = "seated";

  const statusIndicators = {
    booked: "warning",
    seated: "success",
    finished: "muted",
  };

  const statusIndicator = statusIndicators[status];

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
        <a
          href={`/reservations/${reservation_id}/seat`}
          className="btn btn-primary"
        >
          Seat
        </a>
      </div>
      <div className={`card-footer text-${statusIndicator}`}>
        Status: {status}
      </div>
    </>
  );
}

export default Reservation;
