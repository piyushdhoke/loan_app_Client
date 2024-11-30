import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const Admin = () => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in.');
        return;
      }

     
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      if (decodedToken.role !== 'Admin') {
        alert('Access denied. You are not an admin.');
        return;
      }

     
      const response = await axios.get('http://localhost:5000/api/loan', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(response.data);
    } catch (error) {
      setError('Failed to load loans');
      console.error('Error fetching loans:', error);
    }
  };

  const approveLoan = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in.');
        return;
      }

      await axios.patch(
        `http://localhost:5000/api/loans/${id}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Loan approved');
      fetchLoans();
    } catch (error) {
      alert('Failed to approve loan');
      console.error('Error approving loan:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Admin Dashboard
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ul className="divide-y divide-gray-200">
          {loans.map((loan) => (
            <li key={loan._id} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-gray-800">
                  <span className="font-semibold">Amount:</span> ₹{loan.amount}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">State:</span> {loan.state}
                </p>
                {loan.repayments && loan.repayments.length > 0 ? (
                      <>
                        <ul className="mt-2 text-gray-600">
                          {loan.repayments.map((repayment) => (
                            <li key={repayment._id}>
                              Amount: ₹{repayment.amount}, Due Date: {moment(repayment.dueDate).format('DD MMMM YYYY')}, Status : {repayment.status}
                            </li>
                          ))}
                        </ul>
                    
                      </>
                    ) : (
                      <p>No repayments found.</p>
                    )}
              </div>
              {loan.state === 'PENDING' && (
                <button
                  onClick={() => approveLoan(loan._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
