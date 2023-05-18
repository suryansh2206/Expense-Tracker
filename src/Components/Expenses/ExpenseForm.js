import { useEffect, useRef, useState } from "react";
import classes from "./ExpenseForm.module.css";
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

  const getId = (id, isEdit) => {
    const expenseToEdit = items.find((expense) => expense.key === id);
    if (isEdit) {
      console.log(expenseToEdit);
      amountInputRef.current.value = expenseToEdit.amount;
      descriptionInputRef.current.value = expenseToEdit.description;
      categoryInputRef.current.value = expenseToEdit.category;
    }

    let expenseArr = [];

    expenseArr = items.filter((item) => {
      return item !== expenseToEdit;
    });
    setItems(expenseArr);
    fetch(
      `https://react-http-a080a-default-rtdb.firebaseio.com/expensedetails/${username}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        console.log("deleted");
        return res.json();
      } else {
        return res.json().then((data) => {
          alert(data.error.message);
          console.log(data.error);
        });
      }
    });
  };

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
      amountInputRef.current.value = "";
      descriptionInputRef.current.value = "";
      categoryInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.login}>Enter expense details</div>
          <div className={classes.inputBox}>
            <input
              type="number"
              min="1"
              step="10"
              placeholder="AMOUNT"
              required
              ref={amountInputRef}
            />
            {/* <span >Money</span> */}
          </div>

          <div className={classes.inputBox}>
            <input
              type="text"
              placeholder="DESCRIPTION"
              required
              ref={descriptionInputRef}
            />
            {/* <span>Description</span> */}
          </div>

          <div className={classes.inputBox}>
            <input
              list="category"
              placeholder="CATEGORY"
              required
              ref={categoryInputRef}
            />
            {/* <span>Category</span> */}
            <datalist id="category">
              <option value="Snacks"></option>
              <option value="Mobile Recharge"></option>
              <option value="Gym Membership and Stuff"></option>
              <option value="Fuel"></option>
              <option value="Clothes"></option>
            </datalist>
          </div>

          <button className={classes.enter} onClick={submitHandler}>
            Enter
          </button>
        </div>
      </div>
      <div>
        <ExpenseList items={items} getId={getId} />
      </div>
    </>
  );
};

export default ExpenseForm;
