import React from 'react';

interface BikeAvailabilityBadgeProps {
  isAvailable: boolean;
}

const BikeAvailabilityBadge: React.FC<BikeAvailabilityBadgeProps> = ({ isAvailable }) => (
  <span
    className={`px-2 py-1 text-lg font-semibold rounded-full ${isAvailable ? 'bg-green-200 text-green-800' : 'bg-red-500 text-white'
      }`}
  >
    {isAvailable ? 'Available' : 'Unavailable'}
  </span>
);

export default BikeAvailabilityBadge;