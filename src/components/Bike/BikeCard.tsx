

import React from 'react';
import { TBikeCardProps } from '@/types';
import bikeIcon from "../../assets/bycicle.png";
import { Toaster } from 'react-hot-toast';
import BikeImage from './BikeImage';
import BikeDetails from './BikeDetails';
import ViewDetailsButton from './ViewDetailsButton';
import ManageBikeDialog from './ManageBikeDialog';



const BikeCard: React.FC<TBikeCardProps> = ({ bike, status, onDelete }) => {
  return (
    <div className="relative new-amsterdam-regular flex flex-col mt-6 text-gray-700 bg-white shadow-md rounded-xl w-full">
      <BikeImage imageUrl={bike.imageUrl} name={bike.name} />
      <BikeDetails bike={bike} />
      <div className="p-6 pt-0 flex justify-between items-center">
        {status === 'view' ? (
          <ViewDetailsButton bike={bike} />
        ) : (
          <ManageBikeDialog bike={bike} onDelete={onDelete} />
        )}
        <span className='text-3xl flex justify-between gap-2 items-center'>
          <img src={bikeIcon} alt="" />
          {bike.brand}
        </span>
      </div>
      <Toaster />
    </div>
  );
};

export default BikeCard;