import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

function Navbar() {
  const { token, logout, user } = useContext(AuthContext);

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 shadow-lg">
      <nav className="flex justify-between items-center">
     
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-white font-semibold hover:text-yellow-200 transition duration-300"
          >
            Home
          </Link>
          {token && user?.role === 'Admin' && (
            <Link
              to="/admin"
              className="text-white font-semibold hover:text-yellow-200 transition duration-300"
            >
              Admin
            </Link>
          )}
        </div>

  
        <div className="flex space-x-6">
          {token ? (
            <>
              <span className="text-white font-semibold">
                Welcome, {user?.name}
              </span>
              <button
                onClick={logout}
                className="text-white font-semibold hover:text-yellow-200 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white font-semibold hover:text-yellow-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white font-semibold hover:text-yellow-200 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
