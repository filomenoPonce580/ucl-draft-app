import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import Footer from "./Footer";
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
    <div>
      <div className="container-fluid">
        <div className="row h-100">
          <div className="col-md-2 side-bar">
            <Menu />
          </div>
          <div className="col">
            <div>
              <img className="banner" src="https://creativereview.imgix.net/content/uploads/2018/06/banner-UCL18-21_PressKit_KeyVisual_Stadium.jpg?auto=compress,format&q=60&w=1920&h=604" alt="UEFA Champions League Banner"/>
            </div>
            <Routes />
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer/>
      </div>
    </div>
  );
}

export default Layout;
