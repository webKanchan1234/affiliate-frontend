import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Terms & Conditions - Your Website</title>
        <meta
          name="description"
          content="Read our Terms and Conditions before using our services. Learn about our policies, obligations, and legal agreements."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="terms and conditions, legal, policies, website rules" />
        <meta property="og:title" content="Terms & Conditions - Your Website" />
        <meta property="og:description" content="Read our Terms and Conditions before using our services." />
        <meta property="og:url" content="https://yourwebsite.com/terms-and-conditions" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold mb-4 text-center">Terms & Conditions</h1>
        <p className="text-gray-700 mb-6">
          Welcome to <strong>Your Website</strong>. By accessing or using our website, you agree to comply with the following terms and conditions.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold mt-6">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mt-2">
          By using our services, you accept these terms in full. If you disagree with any part, please discontinue use.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold mt-6">2. User Responsibilities</h2>
        <p className="text-gray-600 mt-2">
          Users must provide accurate information and agree not to engage in fraudulent or harmful activities.
        </p>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold mt-6">3. Intellectual Property Rights</h2>
        <p className="text-gray-600 mt-2">
          All content on this site (text, images, logos) is the property of <strong>Your Website</strong> and may not be used without permission.
        </p>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold mt-6">4. Termination of Service</h2>
        <p className="text-gray-600 mt-2">
          We reserve the right to terminate accounts that violate our policies without prior notice.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-semibold mt-6">5. Changes to Terms</h2>
        <p className="text-gray-600 mt-2">
          We may update these terms at any time. Continued use of our website constitutes acceptance of the revised terms.
        </p>

        {/* Contact Information */}
        <h2 className="text-2xl font-semibold mt-6">6. Contact Us</h2>
        <p className="text-gray-600 mt-2">
          If you have any questions, please <Link to="/contact" className="text-indigo-600 hover:underline">contact us</Link>.
        </p>
      </div>
    </>
  );
};

export default TermsAndConditions;
