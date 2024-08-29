// import banner from '../../assets/motorcycle-cropp.jpg';
import banner from "../../assets/motorcycle-cropp.jpg"
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent className='new-amsterdam-regular'>
          <CarouselItem>
            <div className='relative w-full lg:h-[100vh] h-[60vh]'>
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: `url(${banner})` }}
              ></div>
              <div className='absolute inset-0 bg-black  opacity-50'></div>
              <div className='relative z-10 flex flex-col items-center justify-center w-full h-full text-center'>
                <div className='lg:w-[60%] md:w-[80%]'>
                  <h1 className='lg:text-6xl text-2xl font-extrabold text-[#EDEADE]'>
                    Rent Your Favorite  Bikes On
                  </h1>
                  <h2 className='lg:text-7xl text-4xl font-extrabold text-white my-4'>
                    <span className='text-green-500'>10%</span> <span className='text-[#EDEADE]'>Discount</span>
                  </h2>
                  <div className='w-full flex justify-center'>
                    <Link to="/all-bikes" className='bg-green-500 hover:bg-black transition-shadow ease-in-out  duration-1000   text-white text-3xl p-3  rounded-lg shadow-xl'>Visit Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeroSection;
