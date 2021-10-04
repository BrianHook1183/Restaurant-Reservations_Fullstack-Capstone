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
  const statusStyles = {
    booked: "danger",
    seated: "success",
    finished: "muted",
  };

  const statusStyle = statusStyles[status];

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

  const buttons =
    status === "booked" ? (
      <ReservationButtons confirmCancel={confirmCancel} id={reservation_id} />
    ) : null;

  return (
    <>
      <div className="card-header">{reservation_time}</div>
      <div className="card-body">
        <h5 className="card-title">
          "{last_name}, party of {people}!"
        </h5>
        <p className="card-text">
          Contact: ({first_name}) {mobile_number}
        </p>
        {buttons}
        <ErrorAlert error={cancelReservationError} />
      </div>
      <div className="card-footer">
        {`Status: `}
        <span
          className={`text-${statusStyle}`}
          data-reservation-id-status={reservation_id}
        >
          {status}
        </span>
      </div>
    </>
  );
}

export default Reservation;
