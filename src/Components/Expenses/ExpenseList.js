import React from "react";
import classes from "./ExpenseList.module.css";
import { useSelector } from "react-redux";

const ExpenseList = (props) => {
  const item = useSelector(state => state.expense.expenses)
  console.log(item)
  const clickHandler = (id, isEdit) => {
    props.getId(id, isEdit);
  };
  return (
    <>
      <h3>Expense List</h3>
      <ul className={classes.expenselist}>
        {item.map((expense) => (
          <li key={Math.random() * 10}>
            <b>Category</b>{expense.category} <b>Description</b>{expense.description} <b>Amount</b>{expense.expense}
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

//line 17 - expense.amount 