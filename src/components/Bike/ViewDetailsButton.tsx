import React from 'react';
import { Link } from 'react-router-dom';
import { TBike } from '@/types';

interface ViewDetailsButtonProps {
  bike: TBike;
}

const ViewDetailsButton: React.FC<ViewDetailsButtonProps> = ({ bike }) => (
  bike.isAvailable ? (
    <Link
      to={`/bikes/${bike._id}`}
      className="font-bold text-center uppercase duration-300 transition-colors hover:bg-blue-500 text-lg py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:outline-none"
    >
      View Details
    </Link>
  ) : (
    <button
      className="bg-gray-900 text-white text-lg font-bold py-3 px-6 rounded-lg opacity-50 cursor-not-allowed"
    >
      View Details
    </button>
  )
);

export default ViewDetailsButton;