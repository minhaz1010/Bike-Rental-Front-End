import React from 'react';
import { TBike } from '@/types';
import BikeAvailabilityBadge from './BikeAvailibilityBadge';

interface BikeDetailsProps {
  bike: TBike;
}

const BikeDetails: React.FC<BikeDetailsProps> = ({ bike }) => (
  <div className="p-6">
    <h5 className="block mb-2 text-3xl font-extralight leading-snug text-gray-900">
      {bike.name} ({bike.cc}cc)
    </h5>
    <p className="block text-2xl font-light md:h-44 leading-relaxed text-gray-700">
      {bike.description}
    </p>
    <div className="mt-4 flex justify-between items-center">
      <span className="text-2xl font-semibold text-gray-800">
        {bike.pricePerHour.toFixed(2)} BDT / hour
      </span>
      <BikeAvailabilityBadge isAvailable={bike.isAvailable} />
    </div>
  </div>
);

export default BikeDetails;

