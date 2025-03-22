import React from "react";
import Talktosaleform from "./talkToSales";

const Header = () => {
  return (
    <nav className="bg-teal-600 text-white border-b-2 border-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <a href="/" className="navbar-brand">
          <img src="/bolsta_logo.png" alt="Bolsta Logo" className="h-10" />
        </a>
        <button
          className="lg:hidden text-white focus:outline-none"
          type="button"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="lg:flex hidden justify-between space-x-8 items-center" id="navbarNav">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white hover:text-teal-300">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-teal-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-teal-300">
                Resources
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-teal-300">
                Contact
              </a>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            <a href="#" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
              Sign In
            </a>
            <a href="#" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
              Get Bolsta
            </a>
            <Talktosaleform />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
