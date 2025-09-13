import React, { useState } from 'react';

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: ""
  });

  const handleChange = (key, value) =>
    setIncome((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    onAddIncome(income);

    // Optional: reset form after submit
    setIncome({ source: "", amount: "", date: "" });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Income Source
        </label>
        <input
          type="text"
          className="mt-1 block w-full border rounded p-2"
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          className="mt-1 block w-full border rounded p-2"
          value={income.amount}
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
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn"
          onClick={handleSubmit}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
