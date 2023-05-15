import React, { Fragment } from "react";
import classes from "./Welcome.module.css";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  const verifyHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCY-VGJzQO4PuIAWLAzUqOd4c2XvpMOQFs",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => console.log(data));
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.left}>Welcome to Expense Tracker</div>
        <div className={classes.rigth}>
          Your Profile is incomplete{"  "}
          <NavLink
            activeClassName="active"
            className="link"
            to="/updateprofile"
          >
            Complete now
          </NavLink>
          <div>
            Verify your email now{"  "}
            <button onClick={verifyHandler}>Verify</button>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Welcome;
