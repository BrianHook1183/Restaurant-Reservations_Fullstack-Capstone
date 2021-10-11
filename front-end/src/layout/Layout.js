import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import CurrentTime from "../widgets/CurrentTime";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-2 side-bar bg-menu">
          <Menu />
        </div>
        <div className="col">
          <div className="bg-menu sticky-top">
            <CurrentTime />
          </div>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
