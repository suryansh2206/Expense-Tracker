import classes from "./SignUp.module.css";
import React from "react";
import { useRef } from "react";
// import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  // const dispatch = useDispatch()

  const signupHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword === enteredConfirmPassword) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3e8JXD4GylIOAl_tIJafR0-TM0nEq_OE",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        //   setIsLoading(false);
        if (res.ok) {
          res.json().then((data) => {
            localStorage.setItem("token", data.idToken);
          });
          console.log("Sign Up Successful");
          alert("Sign Up successful, please log in to continue");
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
          confirmPasswordInputRef.current.value = "";
        } else {
          return res.json().then((data) => {
            console.log(data);
            if (data.error.message) {
              alert(data.error.message);
            }
          });
        }
      });
    } else {
      alert("Password does not match");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.formbox}>
        <form className={classes.form}>
          <span className={classes.title}>Sign up</span>
          <span className={classes.subtitle}>
            Create a free account with your email.
          </span>
          <div className={classes.formcontainer}>
            <input
              type="email"
              className={classes.input}
              placeholder="Email"
              required
              ref={emailInputRef}
            />
            <input
              type="password"
              className={classes.input}
              placeholder="Password"
              required
              ref={passwordInputRef}
            />
            <input
              type="password"
              className={classes.input}
              placeholder="Confirm Password"
              required
              ref={confirmPasswordInputRef}
            />
          </div>
          <button onClick={signupHandler}>Sign up</button>
        </form>
        <div className={classes.formsection}>
          <p>
            Have an account?{" "}
            <NavLink activeClassName="active" className="link" to="/login">
              <>Log In</>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
