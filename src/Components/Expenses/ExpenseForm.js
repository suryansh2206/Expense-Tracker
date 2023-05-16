import { useEffect, useRef, useState } from "react";
import "./ExpenseForm.css";
import ExpenseList from "./ExpenseList";

const ExpenseForm = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const [items, setItems] = useState([]);

  let username = localStorage.getItem("email");
  let t = "";
  for (let i = 0; i < username.length; i++) {
    if (username[i] === "." || username[i] === "@") {
      continue;
    } else {
      t += username[i];
    }
  }
  username = t;

  useEffect(() => {
    fetch(
      `https://react-http-a080a-default-rtdb.firebaseio.com/expensedetails/${username}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.data);
        }
      })
      .then((data) => {
        let expensedata = [];
        if (data) {
          for (let [key, value] of Object.entries(data)) {
            expensedata.push({ key, ...value });
          }
        }
        setItems(expensedata);
      });
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    const amount = amountInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const category = categoryInputRef.current.value;
    const expense = {
      amount,
      description,
      category,
    };

    setItems([...items, expense]);

    const response = await fetch(
      `https://react-http-a080a-default-rtdb.firebaseio.com/expensedetails/${username}.json`,
      {
        method: "POST",
        body: JSON.stringify(expense),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      alert("Something went wrong :( Try again later.");
      console.log(data.error.message);
    } else {
      console.log(data);
    }
  };

  return (
    <>
      <div class="container">
        <div class="card">
          <p class="login">Enter expense details</p>
          <div class="inputBox">
            <input
              type="number"
              required="required"
              min="1"
              step="10"
              ref={amountInputRef}
            />
            <span class="user">Money</span>
          </div>

          <div class="inputBox">
            <input type="text" required="required" ref={descriptionInputRef} />
            <span>Description</span>
          </div>

          <div class="inputBox">
            <input list="category" required="required" ref={categoryInputRef} />
            <span>Category</span>
            <datalist id="category">
              <option value="Snacks"></option>
              <option value="Mobile Recharge"></option>
              <option value="Gym Membership and Stuff"></option>
              <option value="Fuel"></option>
              <option value="Clothes"></option>
            </datalist>
          </div>

          <button class="enter" onClick={submitHandler}>
            Enter
          </button>
        </div>
      </div>
      <div>
        <ExpenseList items={items} />
      </div>
    </>
  );
};

export default ExpenseForm;
