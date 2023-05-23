import { useEffect, useRef, useState } from "react";
import classes from "./UpdateProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  const nameInputRef = useRef();
  const photoURLInputRef = useRef();
  const navigate = useNavigate();
  const bgColor = useSelector((state) => state.theme.bgColor);
  const [displayName, setName] = useState("");
  const [imageURL, setUrl] = useState("");

  const updateHandler = (event) => {
    event.preventDefault();
    let name = nameInputRef.current.value;
    let photoURL = photoURLInputRef.current.value;

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
        setName(data.users[0].displayName);
        setUrl(data.users[0].photoUrl);
      });
  }, []);

  const cancelHandler = () => {
    navigate("/");
  };

  return (
    <div className={bgColor ? 'dark' : ''}>
      <header className={classes.header}>
        <div className={classes.leftcolumn}>
          Winners never quit, Quitters never win
        </div>
      </header>
      <div className={classes.container}>
        <div className={classes.card}>
          <span className={classes.cardtitle}>Contact Details</span>
          <div className={classes.cardform}>
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
            <button className={classes.signup} onClick={updateHandler}>
              Update
            </button>
            <button className={classes.cancelbutton} onClick={cancelHandler}>
              {" "}
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
