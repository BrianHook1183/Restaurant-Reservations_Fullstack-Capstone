import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
  // handles clicks in DateNavigation component.
  //! Just trying this out: lifted from Dashboard so *date* can be passed as prop to see if it triggers loadDashboard hook.
  const [defaultDate, setDefaultDate] = useState(today());

  // const params = useParams();
  // if (params.date) {
  //   setDefaultDate(params.date);
  // }

  const handleParams = (paramDate) => {
    setDefaultDate(paramDate);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const changeDateTo = event.target.innerText;
    if (changeDateTo === "Prev") {
      const prevDate = previous(defaultDate);
      setDefaultDate(prevDate);
    }
    if (changeDateTo === "Today") {
      const todayDate = today();
      setDefaultDate(todayDate);
    }
    if (changeDateTo === "Next") {
      const nextDate = next(defaultDate);
      setDefaultDate(nextDate);
    }
  };

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      {/* <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route> */}
      <Route path="/reservations">
        <Reservations />
      </Route>
      <Route path="/dashboard/:date">
        <Dashboard />
      </Route>
      <Route path="/dashboard">
        {/* <Dashboard date={today()} /> */}
        <Dashboard
          propDate={defaultDate}
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
