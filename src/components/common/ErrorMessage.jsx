import React from 'react';
import PropTypes from 'prop-types';
// import { Button } from './Button'; // Assuming you have a Button component
import { useNavigate } from 'react-router-dom';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  retry = null, 
  statusCode = null,
  fullPage = false,
  className = '' 
}) => {
  const navigate = useNavigate();

  // Default error messages based on status codes
  const errorMessages = {
    400: 'Bad Request - The server cannot process your request',
    401: 'Unauthorized - Please login to access this resource',
    403: 'Forbidden - You do not have permission to view this',
    404: 'Not Found - The requested resource was not found',
    500: 'Server Error - Our servers are experiencing issues',
    503: 'Service Unavailable - We are undergoing maintenance',
  };

  // Get the appropriate message based on status code
  const displayMessage = statusCode && errorMessages[statusCode] 
    ? errorMessages[statusCode] 
    : message;

  // Container classes
  const containerClasses = `
    ${fullPage ? 'min-h-screen flex items-center justify-center' : ''}
    ${className}
  `;

  // Content classes
  const contentClasses = `
    p-6 rounded-lg border border-red-200 bg-red-50
    ${fullPage ? 'text-center max-w-md w-full' : ''}
  `;

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        <div className="flex flex-col items-center">
          {/* Error icon */}
          <svg 
            className="w-12 h-12 text-red-500 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>

          {/* Error message */}
          <h3 className="text-lg font-medium text-red-800 mb-2">
            {statusCode && `Error ${statusCode}`}
          </h3>
          <p className="text-red-600 mb-4">{displayMessage}</p>

          {/* Action buttons */}
          <div className="flex space-x-3">
            {retry && (
              <button
                variant="primary"
                onClick={retry}
                className="bg-red-600 hover:bg-red-700"
              >
                Try Again
              </button>
            )}
            
            <button
              variant="secondary"
              onClick={() => navigate('/')}
              className="border-gray-300 text-gray-700"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  retry: PropTypes.func,
  statusCode: PropTypes.number,
  fullPage: PropTypes.bool,
  className: PropTypes.string,
};

export default ErrorMessage;