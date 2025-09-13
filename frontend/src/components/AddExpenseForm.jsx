import React, { useState } from 'react';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: ""
  });

  const handleChange = (key, value) =>
    setExpense((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    onAddExpense(expense);

    // Optional: reset form after submit
    setExpense({ category: "", amount: "", date: "" });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Expense Category
        </label>
        <input
          type="text"
          className="mt-1 block w-full border rounded p-2"
          value={expense.category}
          onChange={({ target }) => handleChange("category", target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          className="mt-1 block w-full border rounded p-2"
          value={expense.amount}
          onChange={({ target }) => handleChange("amount", Number(target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          className="mt-1 block w-full border rounded p-2"
          value={expense.date}
          onChange={({ target }) => handleChange("date", target.value)}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
