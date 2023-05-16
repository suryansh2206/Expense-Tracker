import { useEffect, useRef, useState } from "react";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const nameInputRef = useRef();
  const photoURLInputRef = useRef();

  const [displayName, setName] = useState("");
  const [imageURL, setUrl] = useState("");

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

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCY-VGJzQO4PuIAWLAzUqOd4c2XvpMOQFs",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          setName(data.users[0].displayName);
          setUrl(data.users[0].photoUrl);
        }
      });
  }, []);

  return (
    <>
      <header className="header">
        <div className="left-column">
          Winners never quit, Quitters never win
        </div>
      </header>
      <div className="container">
        <div className="card">
          <span className="card__title">Contact Details</span>
          <div className="card__form">
            <input
              placeholder="Full Name"
              type="text"
              required
              defaultValue={displayName}
              ref={nameInputRef}
            />
            <input
              placeholder="Profile picture URL"
              type="text"
              required
              defaultValue={imageURL}
              ref={photoURLInputRef}
            />
            <button className="sign-up" onClick={updateHandler}>
              Update
            </button>
            <button className="cancel_button"> Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
