
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleBikeQuery } from '@/redux/features/bike/bikeApi';
import { useAppSelector } from '@/redux/hook';
import { jwtDecode } from 'jwt-decode';
import { TBike } from '@/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loading from '@/components/Shared/Loading';
import { BookingModalComponent } from '@/components/Booking/BookingModalComponent';

const SingleBike = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleBikeQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const bike: TBike = data?.data;

  if (isLoading) return <Loading message='Loading' />;
  if (isError) return <Loading message='Sorry, some error occurred' />;

  const handleBookNowClick = () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      jwtDecode(token as string);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Invalid token', error);
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto my-11 p-4 new-amsterdam-regular">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 xl:w-2/5">
          <LazyLoadImage
            effect='blur'
            src={bike.imageUrl}
            className="w-full h-auto object-cover rounded-xl"
            alt={bike.name}
            style={{ aspectRatio: '4/3' }}
          />
        </div>
        <div className='w-full lg:w-1/2 xl:w-3/5 space-y-6'>
          <h3 className='text-3xl md:text-4xl lg:text-5xl text-green-500 '>{bike.name}</h3>
          <p className='text-lg md:text-xl'>{bike.description}.</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <p className='text-lg md:text-xl font-light'>Price Per Hour <span className='block text-2xl md:text-3xl text-green-500'>${bike.pricePerHour}</span></p>
            <p className='text-lg md:text-xl font-light'>Engine Power <span className='block text-2xl md:text-3xl text-green-500'>{bike.cc}</span></p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <p className='text-lg md:text-xl font-light'>Model <span className='block text-2xl md:text-3xl text-green-500'>{bike.model}</span></p>
            <p className='text-lg md:text-xl font-light'>Release Year <span className='block text-2xl md:text-3xl text-green-500'>{bike.year}</span></p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <p className='text-lg md:text-xl font-light'>Brand <span className='block text-2xl md:text-3xl text-green-500'>{bike.brand}</span></p>
            <p className='text-lg md:text-xl font-light'>Status <span className='block text-2xl md:text-3xl text-green-500'>{bike.isAvailable ? 'Available' : 'Not Available'}</span></p>
          </div>

          {bike.isAvailable ? (
            <button
              onClick={handleBookNowClick}
              className="w-full md:w-auto font-bold text-center uppercase duration-300 transition-colors hover:bg-blue-700 text-lg py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:outline-none"
            >
              Book now
            </button>
          ) : (
            <button className="md:w-auto bg-gray-900 text-white text-lg font-bold py-3 px-6 rounded-lg opacity-65 cursor-not-allowed">
              Not Available
            </button>
          )}
        </div>
      </div>
      <BookingModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bike={bike}
      />
    </div>
  );
};

export default SingleBike;