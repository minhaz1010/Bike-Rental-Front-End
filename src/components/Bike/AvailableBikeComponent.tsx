


import React from 'react';
import Loading from '../Shared/Loading';
import { useGetAllBikesQuery } from '@/redux/features/bike/bikeApi';
import BikeFilter from './BikeFilter';

const AvailableBikeComponent: React.FC = () => {
  const { isError, isLoading } = useGetAllBikesQuery(undefined);

  if (isLoading) return <Loading message="loading" />;
  if (isError) return <Loading message="sorry some error occurred" />;

  return (
    <div>
      <BikeFilter onFilterChange={() => { }} />
    </div>
  );
};

export default AvailableBikeComponent;