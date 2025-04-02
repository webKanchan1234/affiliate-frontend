export const handleApiError = (error) => {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      const { status, data } = error.response;
  
      if (status === 401) {
        return "Your session has expired. Please log in again.";
      } else if (status === 403) {
        return "You do not have permission to perform this action.";
      } else if (status === 404) {
        return "Resource not found.";
      } else if (status === 500) {
        return "Internal server error. Please try again later.";
      } else if (data && data.message) {
        return data.message; // Use the error message from the server
      } else {
        return "An unexpected error occurred.";
      }
    } else if (error.request) {
      // The request was made but no response was received
      return "Network error. Please check your internet connection.";
    } else {
      // Something happened in setting up the request
      return "An unexpected error occurred.";
    }
  };