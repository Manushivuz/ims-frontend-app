import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="text-gray-800 bg-white border-t border-gray-200 mt-20 sm:mt-32 lg:mt-40">
      <div className="max-w-screen-xl px-3 sm:px-4 lg:px-8 mx-auto py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Company Section */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-base sm:text-lg font-semibold text-gray-900">Company</p>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/aboutus"
                  className="text-sm sm:text-base text-gray-700 transition-colors hover:text-blue-600 block py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-sm sm:text-base text-gray-700 transition-colors hover:text-blue-600 block py-1"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm sm:text-base text-gray-700 transition-colors hover:text-blue-600 block py-1"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-base sm:text-lg font-semibold text-gray-900">Help</p>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/contact-support"
                  className="text-sm sm:text-base text-gray-700 transition-colors hover:text-blue-600 block py-1"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-sm sm:text-base text-gray-700 transition-colors hover:text-blue-600 block py-1"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-base sm:text-lg font-semibold text-gray-900">Legal</p>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/termsandconditions"
                  className="text-sm sm:text-base text-gray-700 transition-colors hover:text-blue-600 block py-1"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacypolicy"
                  className="text-sm sm:text-base text-gray-700 transition-colors hover:text-blue-600 block py-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-sm sm:text-base text-gray-700 transition-colors hover:text-blue-600 block py-1"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-base sm:text-lg font-semibold text-gray-900">Follow Us</p>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center space-x-2 py-1">
                <FontAwesomeIcon icon={faFacebook} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="text-sm sm:text-base text-gray-700">Facebook</span>
              </li>
              <li className="flex items-center space-x-2 py-1">
                <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />
                <span className="text-sm sm:text-base text-gray-700">LinkedIn</span>
              </li>
              <li className="flex items-center space-x-2 py-1">
                <FontAwesomeIcon icon={faInstagram} className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                <span className="text-sm sm:text-base text-gray-700">Instagram</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-4 sm:pt-6 mt-6 sm:mt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              &copy; 2024 Intern Management System. All rights reserved.
            </p>
            <ul className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-600 transition-colors hover:text-blue-600 block py-1"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacypolicy"
                  className="text-gray-600 transition-colors hover:text-blue-600 block py-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-600 transition-colors hover:text-blue-600 block py-1"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
