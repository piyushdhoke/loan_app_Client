import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import axios from 'axios';

const LoanRequest = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const { token } = useContext(AuthContext);

  const handleRequest = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        'http://localhost:5000/api/loans',
        { amount, term },
        config
      );

      alert('Loan requested successfully');
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Loan request failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleRequest}
        className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Request Loan
        </h2>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-600 font-medium mb-2"
          >
            Amount:
          </label>
          <input
            id="amount"
            type="number"
            placeholder="Enter loan amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="term"
            className="block text-gray-600 font-medium mb-2"
          >
            Term (weeks):
          </label>
          <input
            id="term"
            type="number"
            placeholder="Enter loan term in weeks"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoanRequest;
