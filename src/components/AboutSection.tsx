import banner from '../assets/motorcycle-cropp.jpg';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const AboutSection = () => {
  return (
    <div id='about'>
      <Carousel>
        <CarouselContent className='new-amsterdam-regular'>
          <CarouselItem>
            <div className='relative w-full lg:h-[60vh] h-[60vh]'>
              <div
                className='absolute inset-0 bg-cover bg-center '
                style={{ backgroundImage: `url(${banner})` }}
              ></div>
              <div className='absolute inset-0 bg-black  opacity-50'></div>
              <div className='relative z-10 flex flex-col items-center justify-center w-full h-full text-center'>
                <div className='lg:w-[60%] md:w-[80%]'>
                  <h1 className='lg:text-7xl text-5xl font-bold text-[#EDEADE]'>
                    About Us
                  </h1>
                  <h2 className='md:text-4xl text-2xl  text-white my-4'>
                    <span className='text-[#EDEADE]'>At <span className='text-sky-500'>BikeX</span>, we are passionate about providing a seamless bike rental experience. Whether you're exploring the city or hitting the trails, we offer a diverse range of well-maintained bikes to suit every adventure.</span>
                  </h2>

                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default AboutSection;
