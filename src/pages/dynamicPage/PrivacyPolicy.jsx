import React from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      {/* SEO Metadata */}
      <Helmet>
        <title>Privacy Policy | Your Website</title>
        <meta name="description" content="Read our Privacy Policy to understand how we handle your personal data securely and responsibly." />
        <meta name="keywords" content="privacy policy, data security, personal information" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-4">Last updated: March 2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-700">
          Welcome to [Your Website Name]. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <p className="text-gray-700">
          We may collect information such as your name, email address, and browsing activity when you use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
        <p className="text-gray-700">
          Your data helps us improve our services, personalize content, and enhance security.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p className="text-gray-700">
          We implement advanced security measures to protect your personal information from unauthorized access.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about our Privacy Policy, contact us at <a href="mailto:support@yourwebsite.com" className="text-blue-500">support@yourwebsite.com</a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
