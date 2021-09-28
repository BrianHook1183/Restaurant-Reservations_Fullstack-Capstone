import React from "react";
import { Route, Switch } from "react-router-dom";
import New from "./new/New";
import NotFound from "../layout/NotFound";
import Seat from "./seat/Seat";
// import Edit from "./edit/Edit";

/**
 * Defines the reservations page.
 */

// TODO US-08 = /reservations/:reservation_id/edit

function Reservations() {
  return (
    <main>
      <Switch>
        <Route path={"/reservations/new"}>
          <New />
        </Route>
        <Route path={"/reservations/:reservation_id/seat"}>
          <Seat />
        </Route>
        {/*<Route path={"/:reservation_id/edit"}>
          <Edit />
        </Route> */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
}

export default Reservations;
