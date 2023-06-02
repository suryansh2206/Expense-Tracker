import React, { Fragment } from "react";
import classes from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../Expenses/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/auth";
import { themeActions } from "../../Store/theme";

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isActivated = useSelector((state) => state.theme.isActivated);
  const bgColor = useSelector((state) => state.theme.bgColor);
  const verifyHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD3e8JXD4GylIOAl_tIJafR0-TM0nEq_OE",
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
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => console.log(data));
        } else {
          res.json().then((data) => {
            alert(data.error.message);
          });
        }
      })
      .then((data) => {
        window.alert("Email sent for verification");
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
    dispatch(authActions.logout());
    window.location.reload();
  };

  const updateProfileHandler = () => {
    navigate("/updateprofile");
  };

  const toggleHandler = (event) => {
    // event.preventDefault();
    dispatch(themeActions.changeTheme());
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.left}>
          <div>Welcome to Expense Tracker</div>
        </div>
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
          </button>{" "}
        </div>
      </header>
      <div className={bgColor ? "dark" : ""}>
        <div className={classes.togglebutton}>
          {isActivated && (
            <label class={classes.switchcontainer}>
              <input type="checkbox" onClick={toggleHandler} />
              <span class={classes.slider}></span>
            </label>
          )}
        </div>
        <ExpenseForm />
      </div>
    </Fragment>
  );
};

export default Welcome;
