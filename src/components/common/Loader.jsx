import React from "react";

const LoadingSpinner = ({ loading, error }) => {
  if (!loading) return null;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        {/* Loader Animation */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>

        {/* Error Message (if exists) */}
        {error && (
          <p className="text-red-500 mt-4">
            {error?.message || "Server is not responding. Please try again later!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
