import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        {/* Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-semibold">Your Company</h2>
            <p className="text-sm mt-2">
              Providing top-quality products and services worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick Links">
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul className="mt-2">
              <li><Link to="/page/aboutus" className="hover:underline">About Us</Link></li>
              <li><Link to="/page/contactus" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/page/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/page/terms-and-conditions" className="hover:underline">Terms and Conditions</Link></li>
            </ul>
          </nav>

          {/* Social Media Links */}
          <nav aria-label="Social Media">
            <h2 className="text-xl font-semibold">Follow Us</h2>
            <ul className="mt-2 flex space-x-4">
              <li><a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">🌐 Facebook</a></li>
              <li><a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">🐦 Twitter</a></li>
              <li><a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a></li>
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>

      {/* JSON-LD for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Your Company",
          "url": "https://yourwebsite.com",
          "sameAs": [
            "https://facebook.com",
            "https://twitter.com",
            "https://linkedin.com"
          ]
        })}
      </script>
    </footer>
  );
};

export default Footer;
