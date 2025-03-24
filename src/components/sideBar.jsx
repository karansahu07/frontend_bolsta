import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import icons from "../constants/icons";
import { observer } from "mobx-react-lite";

const Icon = ({ name }) => {
  return <img src={icons[name]} />;
};

const Sidebar = ({
  navigations,
  userRole,
  userInfo = {
    userName: "Karan",
    avatar: "",
    email: "karam.ekarigar@gmail.com",
  },
  logoSrc = "/logo.svg",
  darkBackground = "bg-gray-800",
  textColor = "text-white",
  activeItemClass = "bg-blue-600",
  onLogout = () => null,
}) => {
  console.log({ ...userInfo }, userRole);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Filter navigations based on user role
  const filteredNavigations = navigations.filter((nav) =>
    nav.auth.includes(userRole)
  );

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains("sidebar-toggle")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Icon mapping function - replace with actual icons or components
  const getIcon = (iconName) => {
    switch (iconName.toLowerCase()) {
      case "bolsta":
        return <div className="w-5 h-5 rounded-full bg-gray-300"></div>;
      case "trainings":
        return (
          <div className="w-5 h-5">
            <span className="text-lg">📚</span>
          </div>
        );
      case "addaccount":
        return (
          <div className="w-5 h-5">
            <span className="text-lg">➕</span>
          </div>
        );
      case "person":
        return (
          <div className="w-5 h-5">
            <span className="text-lg">👤</span>
          </div>
        );
      default:
        return <div className="w-5 h-5 rounded-full bg-gray-300"></div>;
    }
  };

  return (
    <>
      {/* Mobile navbar with toggle button and logo */}
      <div
        className={`sidebar-toggle fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-3 ${darkBackground} ${textColor} md:hidden`}
        onClick={toggleSidebar}
      >
        <Menu size={24} />
        <img className="h-8" src="/bolsta_logo.png" alt="Bolsta" />
      </div>

      {/* Backdrop for mobile */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-white bg-opacity-20 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />,
          document.body
        )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 h-full w-64 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${darkBackground} ${textColor} flex flex-col`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>

        {/* Logo and User Info */}
        <div className="flex flex-col items-center pt-8 pb-6 border-b border-gray-700">
          {logoSrc && <img src={logoSrc} alt="Logo" className="h-8 mb-4" />}

          {userInfo && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-300 mb-2 overflow-hidden">
                {userInfo.avatar ? (
                  <img
                    src={userInfo.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-400 text-xl font-bold">
                    {userInfo.userName?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <span className="font-semibold">{userInfo.userName}</span>
              <span className="text-sm text-gray-300">{userInfo.email}</span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 overflow-y-aut bg-[#364454]">
          <ul>
            {filteredNavigations.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    location.pathname === item.path
                      ? `${activeItemClass} ${textColor}`
                      : "hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">
                    <Icon name={item.icon} />
                  </span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700 bg-[#364454]">
          <button
            onClick={onLogout}
            className="w-full py-2 bg-white text-gray-800 rounded flex items-center justify-center"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </>
  );
};

export default observer(Sidebar);
