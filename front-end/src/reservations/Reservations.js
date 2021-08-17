import React from "react";
import { Route, Switch } from "react-router-dom";
import New from "./new/New";
// import Seat from "./seat/Seat";
// import Status from "./status/Status";
// import Edit from "./edit/Edit";

/**
 * Defines the reservations page.
 */

// TODO
/* 
 US-04 = /reservations/:reservation_id/seat
 US-06 = /reservations/:reservation_id/status
 US-08 = /reservations/:reservation_id/edit
 */

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
        <Route path={"/:reservation_id/status"}>
          <Edit />
        </Route>
        <Route path={"/:reservation_id/edit"}>
          <Edit />
        </Route> */}
      </Switch>
    </section>
  );
}

export default Reservations;
