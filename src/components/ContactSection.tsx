import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

const contactDetails: ContactInfo = {
  address: "Mirpur-10, Dhaka, Bangladesh",
  phone: "+8801800000000",
  email: "info@bikex.com"
};

const ContactSection: React.FC = () => {
  return (
    <section id='contact' className="py-12 px-4 sm:px-6 lg:px-8 new-amsterdam-regular">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl  text-blue-500 text-center mb-12">Contact Us</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0 mr-3 mt-1" />
                  <div>
                    <h3 className="text-2xl text-orange-500">Address</h3>
                    <p className="mt-1 text-xl text-gray-600">{contactDetails.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-blue-500 flex-shrink-0 mr-3 mt-1" />
                  <div>
                    <h3 className="text-2xl font-medium text-orange-500">Phone</h3>
                    <p className="mt-1 text-xl text-gray-600">{contactDetails.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-blue-500 flex-shrink-0 mr-3 mt-1" />
                  <div>
                    <h3 className="text-2xl font-medium text-orange-500">Email</h3>
                    <p className="mt-1 text-xl text-gray-600">{contactDetails.email}</p>
                  </div>
                </div>
              </div>
              <div className=" rounded-lg p-6">
                <h3 className="text-2xl  text-orange-500 mb-4">Business Hours</h3>
                <ul className="space-y-2 text-xl text-gray-600">
                  <li>Thursday - Tuesday: 9:00 AM - 6:00 PM</li>
                  <li>Wednesday: Closed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;