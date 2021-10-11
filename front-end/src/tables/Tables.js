import React from "react";
import { Route, Switch } from "react-router-dom";
import NewTable from "./new/NewTable";
import NotFound from "../layout/NotFound";

/**
 * Routes for all table based actions- currently can only create new tables
 */

function Tables() {
  return (
    <main>
      <Switch>
        <Route path={"/tables/new"}>
          <NewTable />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
}

export default Tables;
