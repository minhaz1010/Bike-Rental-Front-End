import React from 'react';
import { useGetAllBikesQuery } from '@/redux/features/bike/bikeApi';
import { TBike } from '@/types';
import { useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading';
import BikeCard from '../Bike/BikeCard';

const AllBikes: React.FC = () => {
  const { pathname } = useLocation();
  const { data, error, isLoading } = useGetAllBikesQuery(undefined);
  const bikes: TBike[] = data?.data || [];

  if (isLoading) return <Loading message='loading' />;
  if (error) return <Loading message='sorry some error occurred' />;

  return (
    <>
      <div id="all-bike" className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11">
        {
          pathname === "/" ? (
            bikes.slice(0, 3).map((bike: TBike) => (
              <BikeCard key={bike._id} bike={bike} status='view' />
            ))
          ) : (
            bikes.map((bike: TBike) => (
              <BikeCard key={bike._id} bike={bike} status='view' />
            ))
          )
        }
      </div>
    </>
  );
};

export default AllBikes;
