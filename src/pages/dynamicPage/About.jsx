import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center">About Us</h1>
        
        <p className="text-gray-600 mt-4 text-lg">
          Founded in 2012, <span className="font-semibold text-blue-600">xyz.com</span> has grown to become India’s
          largest gadget discovery platform. Our goal is to empower consumers with detailed information and intuitive
          tools to make informed decisions when buying smartphones and gadgets.
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Our Reach</h2>
          <p className="text-gray-600 mt-2">
            With over <span className="font-semibold">25 million visitors</span> each month, 91mobiles.com ranks among India’s top 200 websites.
            Our community of tech enthusiasts relies on us for the latest updates, reviews, and comparisons.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Our Team</h2>
          <p className="text-gray-600 mt-2">
            Our dedicated team of <span className="font-semibold">70+ professionals</span> operates from Gurgaon and Chennai, bringing you expert insights and unbiased reviews.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Our Partners</h2>
          <p className="text-gray-600 mt-2">
            We collaborate with top tech brands like <span className="font-semibold">Samsung, Nokia, Oppo, Vivo</span>,
            and leading e-commerce platforms including <span className="font-semibold">Amazon, Flipkart, PayTM, TataCliq</span>.
            Our partnerships ensure that our users get the best deals and latest offerings.
          </p>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Join Us</h3>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest tech trends. Explore, compare, and make the best choice with <span className="font-semibold text-blue-600">xyz.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;