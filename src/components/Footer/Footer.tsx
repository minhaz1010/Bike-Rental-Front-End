import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HashLink as Link } from "react-router-hash-link"

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white mt-10 new-amsterdam-regular">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-12 gap-6">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl  mb-4">BikeX</h2>
            <p className="text-gray-400 text-2xl">Revolutionizing urban mobility with cutting-edge bicycle technology.</p>
          </div>
          <div>
            <h3 className="text-3xl  mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about#about" className="text-gray-400 text-2xl  hover:text-white transition duration-300">About Us</Link></li>
              <li><Link to="all-bikes#description" className="text-gray-400 text-2xl hover:text-white transition duration-300">All Bikes</Link></li>
              <li><a href="#" className="text-gray-400 text-2xl hover:text-white transition duration-300">Services</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-3xl  mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-2xl hover:text-white transition duration-300">FAQ</a></li>
              <li><Link to="/about#contact" className="text-gray-400 text-2xl hover:text-white transition duration-300">Contact Us</Link></li>
              <li><a href="#" className="text-gray-400 text-2xl hover:text-white transition duration-300">Shipping</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-3xl mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 text-2xl hover:text-white transition duration-300">
                <FaFacebookF></FaFacebookF>
              </a>
              <a href="#" className="text-gray-400 text-2xl hover:text-white transition duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 text-2xl hover:text-white transition duration-300">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-gray-400 text-2xl hover:text-white transition duration-300">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-lg">© 2024 BikeX. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-lg mr-4">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-lg">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;