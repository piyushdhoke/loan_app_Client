import React from 'react';
import LoanRequest from '../Components/LoanRequest';
import LoanList from '../Components/LoanList';
import Navbar from '../Components/navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
     
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Welcome to Mini Loan App
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white shadow-md rounded-md">
          <div className="bg-white shadow-lg shadow-md  rounded-lg ">
            <LoanRequest />
          </div>
          <div className="bg-white shadow-lg rounded-lg ">
            <LoanList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
