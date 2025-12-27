import React from 'react';
import { Link } from 'react-router-dom';

export const Card = ({key, product }) => {
  console.log("product in Card:", product);
  return (
    <Link
      key={product?.productId}
      to={product.urlName}
      className="group rounded-xl border border-gray-200 shadow-lg p-3 transition-transform transform hover:scale-105 hover:shadow-2xl bg-gradient-to-b from-white to-gray-50 flex flex-col cursor-pointer m-2"
      style={{ width: '220px', height: '320px' }} // Adjusted width and height
    >
      <div className="relative w-full h-40 overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-gray-100 flex items-center justify-center">
        <img
          alt={product?.name}
          src={`${product?.imageUrls[0].url}`}
          className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-90 group-hover:scale-110"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200 text-center capitalize">
          {product?.name.length > 20 ? product?.name.substr(0, 15) + '...' : product?.name}
        </h3>
        <p className="mt-2 text-red-600 font-bold text-center m-0">Rs. {product?.price}</p>
        <button className="mt-3 w-full bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 py-1 cursor-pointer">
          View Details
        </button>
      </div>
    </Link>
  );
};