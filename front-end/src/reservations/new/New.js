import React from "react";
import Form from "../form/Form";

/**
 * Defines the new reservation page.
 */

//TODO
// US-01 = /reservations/:reservation_id/new

function New() {
  return (
    <main>
      <h1>...Under Construction...</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Make a Reservation</h4>
        <Form />
      </div>
      {/* <ErrorAlert error={reservationsError} /> */}
    </main>
  );
}

export default New;
