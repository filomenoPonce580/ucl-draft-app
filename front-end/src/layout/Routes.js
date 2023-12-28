import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import UpdateData from "../updatePage/UpdateData";
import Admin from "../adminPage/Admin";
import Scoreboard from "../scoreboardPage/Scoreboard";
import CreateLeague from "../create/CreateLeague";


/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route exact={true} path="/dashboard">
        <Dashboard />
      </Route>

      <Route exact={true} path="/updatedata">
        <UpdateData />
      </Route>

      <Route exact={true} path="/admin">
        <Admin />
      </Route>

      <Route exact={true} path="/scoreboard">
        <Scoreboard />
      </Route>

      <Route exact={true} path="/create">
        <CreateLeague />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
