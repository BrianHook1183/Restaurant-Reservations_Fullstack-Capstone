import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Reservations from "../reservations/Reservations";
import Tables from "../tables/Tables";
import Search from "../search/Search";
import { today } from "../utils/date-time";
import NotFound from "./NotFound";

/**
 * Defines all the routes for the application.
 *
 * @returns {JSX.Element}
 */

function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations">
        <Reservations />
      </Route>
      <Route path="/tables">
        <Tables />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
