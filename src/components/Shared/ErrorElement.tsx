import React from 'react';
import { Link } from 'react-router-dom';
import sadEmo from '../../assets/sad.gif';

const ErrorElement: React.FC = () => {
  return (
    <div className="flex items-center   new-amsterdam-regular text-3xl justify-center h-screen bg-gray-100">
      <div className="text-center">
        <img
          src={sadEmo}
          alt="Sad-Emoji"
          className="mx-auto size-36 rounded-full bg-transparent mb-6"
        />
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-500 mt-2">
          It looks like the page you are trying to visit doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-green-500 hover:shadow-xl duration-500 text-white font-medium rounded hover:bg-green-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorElement;
