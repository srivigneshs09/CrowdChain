import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo3.png";

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateDashboard = () => {
    navigate("/home");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-sm shadow-sm z-50 bg-white bg-opacity-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-full mr-2 " />
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNavigateHome}
              className="px-4 py-2 text-[#ffde59] font-epilogue hover:scale-110 transition"
            >
              Home
            </button>
            <button
              onClick={handleNavigateDashboard}
              className="px-4 py-2 text-[#ffde59] font-epilogue hover:scale-110 transition"
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarAdmin;
