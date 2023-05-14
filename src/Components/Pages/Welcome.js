import React, { Fragment } from "react";
import "./Welcome.css";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  return (
    <Fragment>
      <header className="header">
        <div className="left-column">Welcome to Expense Tracker</div>
        <div className="rigth-column">
          <div>Your Profile is incomplete</div>
          <NavLink activeClassName="active" className="link" to='/updateprofile'>
            Complete now
          </NavLink>
        </div>
      </header>
    </Fragment>
  );
};

export default Welcome;
