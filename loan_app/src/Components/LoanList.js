import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RepaymentForm from './RepaymentForm';
import moment from 'moment';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoanId, setSelectedLoanId] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized. Please log in.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/loans', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        console.error('Error fetching loans:', error);
      }
    }
  };

  const handleOpenForm = (loanId) => {
    setSelectedLoanId(loanId); 
  };

  const handleCloseForm = () => {
    setSelectedLoanId(null);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Your Loans
        </h2>
        {loans.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {loans.map((loan) => (
              <li key={loan._id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 font-medium">
                      Amount: ₹{loan.amount}
                    </p>
                    <p className="text-sm text-gray-500">Status: {loan.state}</p>
                    {loan.repayments && loan.repayments.length > 0 ? (
                      <>
                        <ul className="mt-2 text-gray-600">
                          {loan.repayments.map((repayment) => (
                            <li key={repayment._id}>
                              Amount: ₹{repayment.amount}, Due Date: {moment(repayment.dueDate).format('DD MMMM YYYY')}, Status : {repayment.status}
                            </li>
                          ))}
                        </ul>
                        { loan.state === 'APPROVED' &&
                        <button
                          onClick={() => handleOpenForm(loan._id)}
                          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                          Repay
                        </button>
                      }
                      </>
                    ) : (
                      <p>No repayments found.</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No loans found.</p>
        )}
      </div>

      {selectedLoanId && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <RepaymentForm loanId={selectedLoanId} />
            <button
              onClick={handleCloseForm}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanList;
