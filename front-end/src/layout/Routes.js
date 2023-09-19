import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import Habits from "../pages/Habits"
import HabitForm from "../pages/HabitsForm";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes({habits}) {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/dashboard">
        <Dashboard habits={habits}/>
      </Route>

      <Route exact={true} path="/habits">
        <Habits habits={habits}/>
      </Route>

      <Route exact={true} path="/habits/new">
        <HabitForm />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
