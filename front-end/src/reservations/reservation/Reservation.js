import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateReservationStatus } from "../../utils/api";
import ReservationButtons from "../buttons/ReservationButtons";
import ErrorAlert from "../../layout/ErrorAlert";

function Reservation({ reservation }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_time,
    people,
    status,
  } = reservation;

  const borderColor = status === "booked" ? "primary" : "muted";
  const bookedShadow = status === "booked" ? "shadow bg-white rounded" : null;
  const cancelledGray =
    status === "cancelled" ? "text-black-50 bg-light" : null;
  const timeStyles = {
    booked: "danger",
    seated: "success",
    finished: "muted",
    cancelled: "white",
  };
  const statusStyle = timeStyles[status];

  const history = useHistory();
  const [cancelReservationError, setCancelReservationError] = useState(null);

  const confirmCancel = () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      setCancelReservationError(null);

      updateReservationStatus(
        reservation_id,
        "cancelled",
        abortController.signal
      )
        // history.go(0) refreshes the current page (should be /dashboard) so that tables effect hook reloads
        .then(() => history.go(0))
        .catch(setCancelReservationError);
      return () => abortController.abort();
    }
  };

  let buttons = null;
  if (status === "booked") {
    buttons = (
      <ReservationButtons confirmCancel={confirmCancel} id={reservation_id} />
    );
  }

  return (
    <div
      className={`card h-100 my-3 text-center ${cancelledGray} border-${borderColor} ${bookedShadow}`}
      style={{ minWidth: "14rem", maxWidth: "14rem" }}
    >
      <div className={`card-header text-${statusStyle}`}>
        <span className="oi oi-clock" />
        &nbsp;{reservation_time}
      </div>
      <div className={`card-body pb-1`}>
        <span className="oi oi-people" />
        <h2 className={`card-title w-25 mx-auto text-center`}>{people}</h2>
        <p className="card-text m-0">
          {first_name} {last_name}
        </p>
        <span className="oi oi-phone" />
        &nbsp;{mobile_number}
      </div>
      {buttons}
      <ErrorAlert error={cancelReservationError} />
      <div className="card-footer text-monospace">
        {`Status: `}
        <span data-reservation-id-status={reservation_id}>{status}</span>
      </div>
    </div>
  );
}

export default Reservation;
