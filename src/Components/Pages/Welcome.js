import React, { Fragment } from "react";
import classes from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../Expenses/ExpenseForm";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth";

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
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

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(authActions.logout())
  };

  const updateProfileHandler = () => {
    navigate("/updateprofile");
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.left}>Welcome to Expense Tracker</div>
        <div className={classes.rigth}>
          {/* <NavLink
            activeClassName="active"
            className="link"
            to="/updateprofile"
          >
            Update Profile
          </NavLink>{" "} */}
          <button className={classes.welcome} onClick={updateProfileHandler}>
            Update Profile
          </button>{" "}
          <button className={classes.welcome} onClick={verifyHandler}>
            Verify Email
          </button>{" "}
          <button className={classes.welcome} onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </header>
      <ExpenseForm />
    </Fragment>
  );
};

export default Welcome;
