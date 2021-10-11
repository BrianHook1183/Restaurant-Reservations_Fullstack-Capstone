import React from "react";
import { Route, Switch } from "react-router-dom";
import New from "./new/New";
import NotFound from "../layout/NotFound";
import Seat from "./seat/Seat";
import Edit from "./edit/Edit";

/**
 * Routes the user based on action: creating, assigning to table, and editing
 */

function Reservations() {
  return (
    <main>
      <Switch>
        <Route path={"/reservations/new"}>
          <New />
        </Route>
        <Route path={"/reservations/:reservation_id/edit"}>
          <Edit />
        </Route>
        <Route path={"/reservations/:reservation_id/seat"}>
          <Seat />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
}

export default Reservations;
