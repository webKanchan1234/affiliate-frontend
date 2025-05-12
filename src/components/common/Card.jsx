import { Link } from "react-router-dom";

const Card = ({ image, title, price, url }) => {
  return (
    <Link 
      to={url} 
      className="group rounded-xl border border-gray-200 shadow-lg p-3 transition-transform transform hover:scale-105 hover:shadow-2xl bg-gradient-to-b from-white to-gray-50 flex flex-col cursor-pointer h-full"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-gray-100 flex items-center justify-center">
        <img
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-90 group-hover:scale-110"
        />
      </div>
      <div className="mt-3 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200 text-center capitalize">
          {title}
        </h3>
        <p className="mt-2 text-red-600 font-bold text-center m-0">Rs. {price}</p>
        <button className="mt-auto w-full bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 py-1 cursor-pointer">
          View Details
        </button>
      </div>
    </Link>
  );
};

export default Card;