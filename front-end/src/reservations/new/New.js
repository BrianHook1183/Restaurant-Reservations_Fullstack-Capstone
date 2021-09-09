import React from "react";
import Form from "../form/Form";

/**
 * Defines the new reservation page.
 */

function New() {
  return (
    <main>
      <div className="d-md-flex mb-3">
        <h1 className="mb-0">Make a Reservation</h1>
      </div>
      <Form />
    </main>
  );
}

export default New;
