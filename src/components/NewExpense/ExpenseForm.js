import React, { useState, useEffect } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  //form validation
  const [titleDirty, setTitleDirty] = useState(false);
  const [amountDirty, setAmountDirty] = useState(false);
  const [dateDirty, setDateDirty] = useState(false);
  const [titleError, setTitleError] = useState("Can not be empty");
  const [amountError, setAmountError] = useState("Set amount");
  const [dateError, setDateError] = useState("Choose date");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (titleError || amountError || dateError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [titleError, amountError, dateError]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "title":
        setTitleDirty(true);
        break;
      case "amount":
        setAmountDirty(true);
        break;
      case "date":
        setDateDirty(true);
        break;
    }
  };

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
    if (event.target.value === "") {
      setTitleError("Enter the title");
    } else {
      setTitleError("");
    }
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    if (event.target.value === 0) {
      setAmountError("Can not be empty");
    } else {
      setAmountError("");
    }
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    if (event.target.value === "") {
      setDateError("Enter date");
    } else {
      setDateError("");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input
              name="title"
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
              onBlur={(e) => blurHandler(e)}
            />
            {titleDirty && titleError && (
              <div style={{ color: "red" }}>{titleError}</div>
            )}
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={enteredAmount}
              onChange={amountChangeHandler}
              onBlur={(e) => blurHandler(e)}
            />
            {amountDirty && amountError && (
              <div style={{ color: "red" }}>{amountError}</div>
            )}
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              name="date"
              type="date"
              min="2019-01-01"
              max="2023-12-31"
              value={enteredDate}
              onChange={dateChangeHandler}
              onBlur={(e) => blurHandler(e)}
            />
            {dateDirty && dateError && (
              <div style={{ color: "red" }}>{dateError}</div>
            )}
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit" disabled={!formValid} className="form-button__submit">
            Add Expense
          </button>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
