import "./SignUp.css";
import React from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const signupHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword === enteredConfirmPassword) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCY-VGJzQO4PuIAWLAzUqOd4c2XvpMOQFs",
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
    <div className="container">
      <div className="form-box">
        <form className="form">
          <span className="title">Sign up</span>
          <span className="subtitle">Create a free account with your email.</span>
          <div className="form-container">
            <input
              type="email"
              className="input"
              placeholder="Email"
              required
              ref={emailInputRef}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              required
              ref={passwordInputRef}
            />
            <input
              type="password"
              className="input"
              placeholder="Confirm Password"
              required
              ref={confirmPasswordInputRef}
            />
          </div>
          <button onClick={signupHandler}>Sign up</button>
        </form>
        <div className="form-section">
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

localStorage.removeItem('token')

