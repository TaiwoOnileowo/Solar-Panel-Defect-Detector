// src/SuccessPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function SuccessPage() {
  const location = useLocation();
  const { user, accessToken } = location.state || {};

  if (!user || !accessToken) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Invalid access</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Signup Successful!</h2>
        <p className="text-center text-gray-700">Welcome, <span className="font-semibold">{user.email}</span></p>
        <p className="text-center text-gray-700">Your user ID is <span className="font-semibold">{user.id}</span></p>
        <p className="text-center text-gray-700">Account created at: <span className="font-semibold">{new Date(user.createdAt).toLocaleString()}</span></p>
        <div className="pt-4">
          <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
