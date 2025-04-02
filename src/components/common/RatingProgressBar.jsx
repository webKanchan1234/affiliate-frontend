import React from "react";

const RatingProgressBar = ({ ratings }) => {
  // Calculate total ratings
  const totalRatings = Object.values(ratings).reduce((sum, count) => sum + count, 0);

  return (
    <div className="w-full max-w-md bg-white ">
      <h2 className="text-xl font-bold mb-4">Customer Ratings</h2>
      
      {Object.entries(ratings)
        .sort(([a], [b]) => b - a) // Sort ratings from 5 stars to 1 star
        .map(([stars, count]) => {
          const percentage = totalRatings ? (count / totalRatings) * 100 : 0;

          return (
            <div key={stars} className="flex items-center mb-2">
              <span className="w-10 text-sm font-semibold">{stars}★</span>
              <div className="w-full h-4 bg-gray-200 overflow-hidden mx-2">
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-sm">{count}</span>
            </div>
          );
        })}
    </div>
  );
};

export default RatingProgressBar;
