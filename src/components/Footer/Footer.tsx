import React from "react";

export default function Footer() {
  return (
    <footer className="text-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p>
              &copy; {new Date().getFullYear()} MyEventVault. All rights
              reserved.
            </p>
            <p>Designed and developed by Matias Fandiño.</p>
          </div>
          <div>
            <ul className="flex flex-wrap justify-center sm:justify-end space-x-4">
              <li>
                <a href="#" className="hover:text-black">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
