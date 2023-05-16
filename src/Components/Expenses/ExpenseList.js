import React from "react";
import "./ExpenseList.css";

const ExpenseList = (props) => {
  const clickHandler = (id, isEdit) => {
    props.getId(id, isEdit);
  };
  return (
    <>
      <h3>Expense List</h3>
      <ul className="expense-list">
        {props.items.map((expense) => (
          <li key={Math.random() * 10}>
            {expense.category} - {expense.description} - {expense.amount}
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
