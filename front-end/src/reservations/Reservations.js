import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
// import { listReservations } from "../utils/api";
// import ErrorAlert from "../layout/ErrorAlert";
import New from "./new/New";
// import Seat from "./seat/Seat";
// import Edit from "./edit/Edit";

/**
 * Defines the reservations page.
 */

//TODO
// US-01 = /reservations/:reservation_id/new
// US-04 = /reservations/:reservation_id/seat
// US-08 = /reservations/:reservation_id/edit

function Reservations() {
  return (
    <section>
      <Switch>
        <Route path={"/:reservation_id/new"}>
          <New />
        </Route>
        {/* <Route path={"/:reservation_id/seat"}>
          <Seat />
        </Route>
        <Route path={"/:reservation_id/edit"}>
          <Edit />
        </Route> */}
      </Switch>
    </section>
  );
}

export default Reservations;
