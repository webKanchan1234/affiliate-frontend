import React, { useEffect, useState } from "react";
import axios from "axios";

const ServerStatus = () => {
  const [serverDown, setServerDown] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/health`); // Change this to your actual health-check endpoint
        setServerDown(false);
      } catch (error) {
        setServerDown(true);
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 10000); // Check server every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (serverDown) {
    return (
        <div className=" bg-red-500 text-white text-center p-2 font-bold z-50 shadow-lg">
        🚨 Server is currently down. Please try again later! 🚨
      </div>
    );
  }

  return null;
};

export default ServerStatus;
