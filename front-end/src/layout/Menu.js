import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
      <nav className="navbar navbar-dark align-items-start p-0">
        <div className="container-fluid d-flex flex-column p-0">
          <Link
            className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
            to="/"
          >
            <div className="sidebar-brand-text mx-3 mt-2">
              <span>UCL Draft Room</span>
            </div>
          </Link>
          <hr className="sidebar-divider my-0" />
          <div className="row">
            <ul className="nav navbar-nav text-light" id="accordionSidebar">
              <li className="nav-item col">
                <Link className="nav-link" to="/dashboard">
                  <span className="oi oi-dashboard" />
                  &nbsp;Dashboard
                </Link>
              </li>
              {/* <li className="nav-item col">
                <Link className="nav-link" to="/search">
                  <span className="oi oi-magnifying-glass" />
                  &nbsp;Search
                </Link>
              </li> */}
              <li className="nav-item col">
                <Link className="nav-link" to="/updatedata">
                  <span className="oi oi-data-transfer-upload" />
                  &nbsp;Update Scores
                </Link>
              </li>
              <li className="nav-item col">
                <Link className="nav-link" to="/scoreboard">
                  <span className="oi oi-layers" />
                  &nbsp;Scoreboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center d-none d-md-inline">
            <button
              className="btn rounded-circle border-0"
              id="sidebarToggle"
              type="button"
            />
          </div>
        </div>
      </nav>
  );
}

export default Menu;
