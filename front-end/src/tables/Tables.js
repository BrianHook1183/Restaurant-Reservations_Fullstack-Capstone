import React from "react";
import { Route, Switch } from "react-router-dom";
import NewTable from "./new/NewTable";
import NotFound from "../layout/NotFound";

/**
 * Defines the tables page.
 */

function Tables() {
  return (
    <section>
      <Switch>
        <Route path={"/tables/new"}>
          <NewTable />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </section>
  );
}

export default Tables;
