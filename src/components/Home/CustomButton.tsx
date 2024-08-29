// import { Link } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link"

const CustomButton = () => {
  return (
    <div className="flex justify-center mt-4 ">
      <Link to="/all-bikes/#bike" type="button" className="new-amsterdam-regular bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-green-500/50 transition-shadow duration-300 ease-in-out text-3xl">
        See All  Bikes
      </Link>
    </div>
  );
};

export default CustomButton;