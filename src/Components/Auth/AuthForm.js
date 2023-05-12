import "./AuthForm.css";
import React from "react";
import { useRef, useState, useContext } from "react";
import AuthContext from "../../Store/auth-context";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const loginHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCY-VGJzQO4PuIAWLAzUqOd4c2XvpMOQFs",
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
    )
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          const data = await res.json();
          console.log(data);
          if (data.error.message) {
            alert(data.error.message);
          }
        }
      })
      .then((data) => {
        console.log(data);
        if (data.idToken) {
          // console.log(data.idToken);
          authCtx.logIn(data.idToken, enteredEmail);
          // history.replace('/')
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });

    // console.log(enteredEmail, enteredPassword)
  };

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
            console.log('Sign Up Successful')
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
        alert('Password does not match')
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
          Have an account? <a href="">Log in</a>{" "}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
