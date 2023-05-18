import React from "react";
import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  const clickHandler = (id, isEdit) => {
    props.getId(id, isEdit);
  };
  return (
    <>
      <h3>Expense List</h3>
      <ul className={classes.expenselist}>
        {props.items.map((expense) => (
          <li key={Math.random() * 10}>
            <b>Category</b>{expense.category} <b>Description</b>{expense.description} <b>Amount</b>{expense.amount}
            <button onClick={() => clickHandler(expense.key, true)}>
              Edit
            </button>{" "}
            <button onClick={() => clickHandler(expense.key, false)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExpenseList;
