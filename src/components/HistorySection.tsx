import { TMilestone } from '@/types';
import React from 'react';



const milestones: TMilestone[] = [
  {
    year: 2014,
    title: "Our Journey Begins",
    description: "Founded with a fleet of just 10 bikes, we started our mission to make cycling accessible to everyone in the city."
  },
  {
    year: 2016,
    title: "Expanding Our Reach",
    description: "Opened our second location and introduced electric bikes to our fleet, catering to a wider range of cyclists."
  },
  {
    year: 2018,
    title: "Community Partnerships",
    description: "Launched our 'Bikes for All' program, partnering with local schools and community centers to promote cycling education."
  },
  {
    year: 2020,
    title: "Tech Integration",
    description: "Developed our mobile app for easy bookings and introduced GPS tracking for all our bikes, enhancing user experience and safety."
  },
  {
    year: 2023,
    title: "Sustainability Milestone",
    description: "Achieved carbon neutrality in our operations and expanded our fleet to include 500 bikes across 5 locations in the city."
  }
];

const HistorySection: React.FC = () => {
  return (
    <section className="new-amsterdam-regular py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl  text-blue-500 text-center mb-12">
          <span className='block mb-2'>📜</span>
          Our History</h2>
        <div className="relative">
          <div className="absolute left-0 sm:left-1/2 transform -translate-x-px sm:-translate-x-1/2 h-full w-0.5 bg-sky-300" aria-hidden="true"></div>
          {milestones.map((milestone, index) => (
            <div key={index} className="relative mb-12">
              <div className={`flex items-center gap-1 ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 w-12 h-12  rounded-full bg-blue-500 text-white flex items-center justify-center z-10 text-xl">
                  {milestone.year}
                </div>
                <div className={`flex-grow ${index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'} sm:w-1/2`}>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-3xl  text-orange-500 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 md:text-2xl text-lg ">{milestone.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;