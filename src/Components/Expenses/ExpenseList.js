import React from "react";
import "./ExpenseList.css";

const ExpenseList = (props) => {
  return (
    <ul className="expense-list">
      {props.items.map((expense) => (
        <li key={expense.id}>
          {expense.category} - {expense.description} - {expense.amount}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
