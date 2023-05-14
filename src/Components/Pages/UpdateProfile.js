import { useRef } from "react";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const nameInputRef = useRef();
  const photoURLInputRef = useRef();
  const updateHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const photoURL = photoURLInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCY-VGJzQO4PuIAWLAzUqOd4c2XvpMOQFs",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: name,
          photoUrl: photoURL,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log(res.json);
        console.log("Updated Successfully");
      } else {
        return res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
  };

  return (
    <>
      <header className="header">
        <div className="left-column">
          Winners never quit, Quitters never win
        </div>
      </header>
      <div className="container">
        <div class="card">
          <span class="card__title">Contact Details</span>
          <div class="card__form">
            <input
              placeholder="Full Name"
              type="text"
              required
              ref={nameInputRef}
            />
            <input
              placeholder="Profile picture URL"
              type="text"
              required
              ref={photoURLInputRef}
            />
            <button class="sign-up" onClick={updateHandler}>
              Update
            </button>
            <button class="cancel_button"> Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
