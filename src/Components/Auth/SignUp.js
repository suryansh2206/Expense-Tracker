import "./SignUp.css";
import React from "react";
import { useRef, useContext } from "react";
import AuthContext from "../../Store/auth-context";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

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
          header: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        //   setIsLoading(false);
        if (res.ok) {
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
    <div class="form-box">
      <form class="form">
        <span class="title">Sign up</span>
        <span class="subtitle">Create a free account with your email.</span>
        <div class="form-container">
          <input
            type="email"
            class="input"
            placeholder="Email"
            required
            ref={emailInputRef}
          />
          <input
            type="password"
            class="input"
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
          <input
            type="password"
            class="input"
            placeholder="Confirm Password"
            required
            ref={confirmPasswordInputRef}
          />
        </div>
        <button onClick={signupHandler}>Sign up</button>
      </form>
      <div class="form-section">
        <p>
          Have an account?{" "}
          <NavLink activeClassName="active" className="link" to="/login">
            <>Log In</>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
