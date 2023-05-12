import "./LogIn.css";
import React from "react";
import { useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const loginHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          const data = res.json();
          if (data.error.message) {
            alert(data.error.message);
          }
        }
      })
      .then((data) => {
        console.log(data);
        if (data.idToken) {
          console.log(data.idToken);
          authCtx.logIn(data.idToken, enteredEmail);//not working from here most probably
          // history.replace('/')
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });

    console.log('Successfully Logged In')
  };
  return (
    <div class="form-box">
      <form class="form">
        <span class="title">Log In</span>
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
        </div>
        <button onClick={loginHandler}>Log In</button>
      </form>
      <div class="form-section">
        <p>
          Don't have an account?{" "}
          <NavLink activeClassName="active" className="link" to="/signup">
            <>Sign up</>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
