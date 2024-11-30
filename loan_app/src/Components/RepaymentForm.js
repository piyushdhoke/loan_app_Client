import React, { useState } from 'react';
import axios from 'axios';

const RepaymentForm = ({ loanId }) => {
  const [amount, setAmount] = useState('');

  const handleRepayment = async (e) => {
    e.preventDefault();

    if (!loanId) {
      alert('Loan ID not found.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/loans/${loanId}/repayments`,
        { amount },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Repayment successful');
      setAmount('');
    } catch (error) {
      console.error('Error during repayment:', error);
      alert('Repayment failed. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleRepayment}
      className="bg-gray-50 shadow-lg rounded-lg p-4 w-full max-w-md mx-auto"
    >
      <h3 className="text-lg font-bold text-gray-700 mb-4">Make a Repayment</h3>
      <div className="mb-4">
        <label
          htmlFor="repayment-amount"
          className="block text-sm font-medium text-gray-600"
        >
          Repayment Amount
        </label>
        <input
          id="repayment-amount"
          type="number"
          placeholder="Enter repayment amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Repay
      </button>
    </form>
  );
};

export default RepaymentForm;
