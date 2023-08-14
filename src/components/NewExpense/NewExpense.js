import React, { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [showForm, setShowForm] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setShowForm(false);
  };

  const showingForm = () => {
    setShowForm(true);
  };
  const stopShowingForm = () => {
    setShowForm(false);
  };

  return (
    <div className="new-expense">
      {!showForm && (
        <button type="submit" onClick={showingForm}>
          Add New Expense
        </button>
      )}
      {showForm && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopShowingForm}
        />
      )}
    </div>
  );
};

export default NewExpense;
