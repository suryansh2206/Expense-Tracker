import { useRef, useState } from "react";
import classes from "../Pages/UpdateProfile.module.css";

const ResetPassword = () => {
  const emailInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const resetHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const email = emailInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCY-VGJzQO4PuIAWLAzUqOd4c2XvpMOQFs",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        res.json().then((data) => console.log(data));
        alert("Reset password link sent");
      } else {
        return res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="card">
        <span className="card__title">
          Enter the email with which you have registered
        </span>
        <div className="card__form">
          <input placeholder="Email" type="text" required ref={emailInputRef} />
          {!isLoading && (
            <button className="sign-up" onClick={resetHandler}>
              Send Link
            </button>
          )}
          {isLoading && <p>Sending link Please wait</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
