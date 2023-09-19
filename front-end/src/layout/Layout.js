import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import { listHabits } from "../utils/api";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  // const [habits, setHabits] = useState([]);
  // const [habitsError, setHabitsError] = useState(null);

  // useEffect(loadInformation, [habits]);
  // function loadInformation() {
  //   const abortController = new AbortController();
  //   setHabitsError(null);
  //   listHabits(abortController.signal)
  //     .then(setHabits)
  //     .catch()
  //   return () => abortController.abort();
  // }

  return (
    <div className="container-fluid">
      <div className="col h-100">
        <div className="row-md-2 side-bar">
          <Menu />
        </div>
        <div className="row justify-content-center p-4 m-3">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
