
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/register/', {
        username,
        password,
      });
      setSuccess(true);
      setError(null);
     
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
      setSuccess(false);
    }
    

  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-parisienne">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
        aria-label="Registration form container"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% -10%, rgba(0, 150, 150, 0.08), transparent 35%), radial-gradient(circle at 100% 0%, rgba(0, 100, 180, 0.08), transparent 30%)",
        }}
      >
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">
            Registration successful! 
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Registration form">
          <div>
            <label htmlFor="username" className="block text-lg font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-base text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate("/")}
              className="font-medium text-blue-600 hover:text-teal-500 focus:outline-none focus:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
