import { useEffect, useRef, useState } from "react";
import classes from "./ExpenseForm.module.css";
import ExpenseList from "./ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../Store/expense";

const ExpenseForm = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const dispatch = useDispatch();
  // const [items, setItems] = useState([]);

  const item = useSelector((state) => state.expense.expenses);
  let username = localStorage.getItem("email") || " ";
  let t = "";
  for (let i = 0; i < username.length; i++) {
    if (username[i] === "." || username[i] === "@") {
      continue;
    } else {
      t += username[i];
    }
  }
  username = t;

  const getId = (id, isEdit) => {
    const expenseToEdit = item.find((expense) => expense.key === id);
    if (isEdit) {
      console.log(expenseToEdit);
      amountInputRef.current.value = expenseToEdit.expense;
      descriptionInputRef.current.value = expenseToEdit.description;
      categoryInputRef.current.value = expenseToEdit.category;
    }
    // let expenseArr = [];
    // expenseArr = items.filter((item) => {
    //   return item !== expenseToEdit;
    // });
    // setItems(expenseArr);
    fetch(
      `https://expense-tracker-c922d-default-rtdb.firebaseio.com/
expensedetails/${username}.json`,
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
    dispatch(expenseAction.removeExpense(id));
  };

  useEffect(() => {
    fetch(
      `https://expense-tracker-c922d-default-rtdb.firebaseio.com/
expensedetails/${username}.json`
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
        let totalExpenseAmount = 0;
        if (data) {
          for (let [key, value] of Object.entries(data)) {
            expensedata.push({ key, ...value });
            totalExpenseAmount = totalExpenseAmount + +value.expense;
          }
        }
        console.log(totalExpenseAmount);
        // setItems(expensedata);
        dispatch(
          expenseAction.replaceExpense({
            items: expensedata || [],
            totalExpense: totalExpenseAmount,
          })
        );
      });
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    const amount = amountInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const category = categoryInputRef.current.value;
    const expense = {
      expense: amount,
      description: description,
      category: category,
    };

    // setItems([...items, expense]);

    const response = await fetch(
      `https://expense-tracker-c922d-default-rtdb.firebaseio.com/
expensedetails/${username}.json`,
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

    dispatch(
      expenseAction.addExpense({
        expense: expense.expense,
        description: expense.description,
        category: expense.category,
      })
    );
    window.location.reload();
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
              <option value="Food"></option>
              <option value="Electronics"></option>
              <option value="Gym Membership and Stuff"></option>
              <option value="Vehicle"></option>
              <option value="Clothes"></option>
              <option value="Others"></option>
            </datalist>
          </div>

          <button className={classes.enter} onClick={submitHandler}>
            Enter
          </button>
        </div>
      </div>
      <div>
        <ExpenseList getId={getId} />
      </div>
    </>
  );
};

export default ExpenseForm;
