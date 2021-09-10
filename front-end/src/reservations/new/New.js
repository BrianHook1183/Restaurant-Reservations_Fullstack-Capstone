import React from "react";
import Form from "../form/Form";

/**
 * Defines the new reservation page.
 */

//TODO  US-02
/* 
The /reservations/new page will display an error message with className="alert alert-danger" if any of the following constraints are violated:
1) The reservation date is a Tuesday as the restaurant is closed on Tuesdays.
2) The reservation date is in the past. Only future reservations are allowed.
*/

//TODO Refactor Form and New so that error messages appear here

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
