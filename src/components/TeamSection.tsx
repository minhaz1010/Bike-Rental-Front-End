import { TTeamMember } from '@/types';
import React from 'react';
import person1 from "../assets/p-1.jpeg"
import person2 from "../assets/p2.jpeg"
import person3 from "../assets/p-3.jpg"

const teamMembers: TTeamMember[] = [
  {
    name: "Mike Husky",
    role: "Founder & CEO",
    bio: "Husky has been passionate about cycling for over 20 years and founded our bike rental service to share her love of exploring on two wheels.",
    imageUrl: person1
  },
  {
    name: "Jimmy Laurence",
    role: "Head of Operations",
    bio: "With a background in logistics, Jimmy ensures our bike fleet is always in top condition and readily available for our customers.",
    imageUrl: person2
  },
  {
    name: "Huston King",
    role: "Customer Experience Manager",
    bio: "Huston's friendly demeanor and extensive knowledge of local bike routes help create unforgettable experiences for our riders.",
    imageUrl: person3
  }
];

const TeamSection: React.FC = () => {
  return (
    <section className="new-amsterdam-regular py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl text-blue-500 text-center mb-12">
          <span className='block mb-2'>👥</span>
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-auto md:h-96 object-cover"
              />
              <div className="p-6">
                <h3 className="text-4xl text-orange-500 mb-2">{member.name}</h3>
                <p className=" text-2xl mb-4">{member.role}</p>
                <p className="text-gray-700 text-xl">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;