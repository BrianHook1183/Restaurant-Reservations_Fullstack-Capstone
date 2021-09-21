import React from "react";
import Form from "../form/Form";

/**
 * Defines the page that is used to create a new reservation
 */

function New() {
  return (
    <section>
      <div className="d-md-flex mb-3">
        <h1 className="mb-0">Make a Reservation</h1>
      </div>
      <Form />
    </section>
  );
}

export default New;
