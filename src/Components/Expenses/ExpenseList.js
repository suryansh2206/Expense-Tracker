import React from "react";
import classes from "./ExpenseList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../Store/theme";
import DownloadCSV from "./DownloadCSV";

const ExpenseList = (props) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.expense.expenses);
  const ExpenseCount = useSelector((state) => state.expense.totalExpense);
  const isActivated = useSelector((state) => state.theme.isActivated);
  console.log(item);
  const clickHandler = (id, isEdit) => {
    props.getId(id, isEdit);
  };
  const activateHandler = (event) => {
    event.preventDefault();
    dispatch(themeActions.activateTheme());
    console.log("premium activated");
  };
  return (
    <>
      <div className={classes.container}>
        {ExpenseCount > 10000 && (
          <button className={classes.welcome} onClick={activateHandler}>
            Activate Premium
          </button>
        )}
      </div>
      <h3>Expense List</h3>
      <h6>Totat Expenses - ₹ {ExpenseCount}</h6>
      {isActivated && (
        <div className={classes.downloadbutton}>
          <DownloadCSV data={item} />
        </div>
      )}
      <ul className={classes.expenselist}>
        {item.map((expense) => (
          <li key={Math.random() * 10}>
            <b>Category</b>
            {expense.category} <b>Description</b>
            {expense.description} <b>Amount</b>
            {expense.expense}
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
