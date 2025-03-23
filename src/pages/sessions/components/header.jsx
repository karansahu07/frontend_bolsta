import React, { useState, useEffect, useRef } from "react";
import Talktosaleform from "./talkToSales";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label="Toggle menu"]')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav className="bg-transparent border-b border-white border-opacity-30" style={{ borderBottomWidth: "3px", background: 'linear-gradient(150deg, rgba(58,109,112,1) 0%, rgba(36,52,69,1) 13%, rgba(36,52,69,1) 88%, rgba(58,109,112,1) 99%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <img src="/bolsta_logo.png" alt="Bolsta Logo" className="h-8 w-auto" />
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none z-50"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1">
            <div className="flex items-center space-x-4">
              <a href="#" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </a>
              <a href="#" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              <a href="#" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Resources
              </a>
              <a href="#" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </a>
            </div>
            
            <div className="flex items-center space-x-2">
              <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600">
                Sign In
              </a>
              <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-500 hover:bg-green-600">
                Get Bolsta
              </a>
              <Talktosaleform />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile side menu */}
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 h-full bg-gray-800 bg-opacity-95 w-64 z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          background: 'linear-gradient(150deg, rgba(58,109,112,1) 0%, rgba(36,52,69,1) 13%, rgba(36,52,69,1) 88%, rgba(58,109,112,1) 99%)',
        }}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="px-4 pt-2 pb-3 space-y-3">
          <a href="#" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
            Pricing
          </a>
          <a href="#" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
            Resources
          </a>
          <a href="#" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
            Contact
          </a>
          <div className="flex flex-col space-y-4 pt-4">
            <a href="#" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600">
              Sign In
            </a>
            <a href="#" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-500 hover:bg-green-600">
              Get Bolsta
            </a>
            <div className="py-2">
              <Talktosaleform />
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Header;