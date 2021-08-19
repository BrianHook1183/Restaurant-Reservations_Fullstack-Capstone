import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Reservations from "../reservations/Reservations";
import { today, previous, next } from "../utils/date-time";
import NotFound from "./NotFound";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const history = useHistory();

  const [defaultDate, setDefaultDate] = useState(today());

  // handles date change clicks and urlParam changes in Dashboard component.
  //TODO this state / click / param handling should probably be offloaded away from Routes.js so it can stay clean. Some sort of DateManager component that would be the parent for Dashboard and any other component that needs to keep track of the date.
  //TODO Can probably get rid of defaultDate state completely and just rely on paramDate - routing redirect should handle case of no params.date existing anyways. Keeping for now because date managed in useState may come in handy later.

  const handleParams = (paramDate) => {
    setDefaultDate(paramDate);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const changeDateTo = event.target.innerText;
    if (changeDateTo === "Prev") {
      const prevDate = previous(defaultDate);
      setDefaultDate(prevDate);

      const urlDashboardDate = `/dashboard/${prevDate}`;
      history.push(urlDashboardDate);
    }
    if (changeDateTo === "Today") {
      const todayDate = today();
      setDefaultDate(todayDate);

      const urlDashboardDate = `/dashboard/${todayDate}`;
      history.push(urlDashboardDate);
    }
    if (changeDateTo === "Next") {
      const nextDate = next(defaultDate);
      setDefaultDate(nextDate);

      const urlDashboardDate = `/dashboard/${nextDate}`;
      history.push(urlDashboardDate);
    }
  };

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations">
        <Reservations />
      </Route>
      <Route exact={true} path="/dashboard">
        <Redirect to={`/dashboard/${today()}`} />
      </Route>
      <Route path="/dashboard/:date">
        <Dashboard
          date={defaultDate}
          handleParams={handleParams}
          handleClick={handleClick}
        />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
