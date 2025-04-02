import React from "react";
import { Link } from "react-router-dom";

const RewardBanner = ({ page }) => {
  // Define different styles & messages per page
  const rewardStyles = {
    home: {
      container: "fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all hover:scale-105 z-50",
      text: "🎁 Earn 3-4% Cashback on Your Purchase!",
      button: "bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition",
    },
    product: {
      container: "w-full bg-indigo-600 text-white text-center py-3 font-bold",
      text: "🎉 Buy from our affiliate links & get 3-4% rewards!",
      button: "bg-yellow-400 text-black px-3 py-1 rounded-md font-semibold ml-2",
    },
    checkout: {
      container: "fixed top-0 w-full bg-green-500 text-white text-center py-2 font-bold z-50",
      text: "✅ Confirm your purchase & claim 3-4% cashback!",
      button: "bg-white text-green-700 px-3 py-1 rounded-md font-semibold ml-2",
    },
  };

  const { container, text, button } = rewardStyles[page] || rewardStyles.home;

  return (
    <div className={container}>
      <span>{text}</span>
      <Link to="/submit/proof" className={button}>
        Claim Now →
      </Link>
    </div>
  );
};

export default RewardBanner;
