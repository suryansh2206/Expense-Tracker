import { useEffect, useRef, useState } from "react";
import classes from "./UpdateProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  const nameInputRef = useRef();
  const photoURLInputRef = useRef();
  const navigate = useNavigate();
  const bgColor = useSelector((state) => state.theme.bgColor);
  const [name, setName] = useState("");
  const [imageURL, setUrl] = useState("");

  const updateHandler = (event) => {
    event.preventDefault();
    let enteredName = nameInputRef.current.value;
    let enteredPhotoURL = photoURLInputRef.current.value;

    if (enteredName && enteredPhotoURL) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD3e8JXD4GylIOAl_tIJafR0-TM0nEq_OE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("token"),
            displayName: enteredName,
            photoUrl: enteredPhotoURL,
            // returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
        // ).then((res) => {
        //   if (res.ok) {
        //     console.log(res.json);
        //     console.log("Updated Successfully");
        //   } else {
        //     return res.json().then((data) => {
        //       alert(data.error.message);
        //     });
        //   }
        // });
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          alert("Updated Successfully");
        });
    } else {
      alert("Please Enter Name and Photo Url");
    }
  };

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD3e8JXD4GylIOAl_tIJafR0-TM0nEq_OE",
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
    <div>
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
              defaultValue={name}
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
