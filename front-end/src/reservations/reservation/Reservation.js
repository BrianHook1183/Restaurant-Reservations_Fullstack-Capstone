import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateReservationStatus } from "../../utils/api";
import ReservationButtons from "../buttons/ReservationButtons";
import ErrorAlert from "../../layout/ErrorAlert";

/**
 * A card-based layout used for each reservation
 */

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
      <div className={"bg-light"}>
        <ReservationButtons confirmCancel={confirmCancel} id={reservation_id} />
      </div>
    );
  }

  return (
    <div
      className={`card h-100 m-0 mx-2 mb-3 text-center ${cancelledGray} border-${borderColor} ${bookedShadow}`}
      style={{ minWidth: "218px", maxWidth: "236px" }}
    >
      <div className={`card-header p-0 py-2 text-${statusStyle}`}>
        <span className="oi oi-clock mr-2" />
        {reservation_time}
      </div>

      <div className={`card-body p-0 py-2`}>
        <span className={`oi oi-people`} />
        <h3 className={"card-text font-weight-bold d-inline ml-2"}>{people}</h3>
        <p className="card-text mt-2 mb-1 ">
          {first_name} {last_name}
        </p>
        <a
          className={`p-0 
            ${
              status === "booked"
                ? "font-weight-bolder"
                : "text-muted font-weight-light"
            }
          `}
          href={`tel:${mobile_number}`}
        >
          <span className="oi oi-phone mr-2" />
          {mobile_number}
        </a>
      </div>

      <div className="card-footer text-monospace p-0 py-1">
        {`Status: `}
        <span
          className={`text-${statusStyle}`}
          data-reservation-id-status={reservation_id}
        >
          {status}
        </span>
        <ErrorAlert error={cancelReservationError} />
      </div>
      {buttons}
    </div>
  );
}

export default Reservation;
