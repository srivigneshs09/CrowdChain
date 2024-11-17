// NavbarHome.js
import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../config/auth-firebase";
import { useNavigate } from "react-router-dom"; // For navigation
import logo from "../assets/logo3.png";

const NavbarHome = () => {
  const [user, setUser] = useState(null); // State to manage user information
  const navigate = useNavigate(); // Hook for navigation

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Sign-in failed. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state
      alert("You have been logged out.");
    } catch (error) {
      console.error("Error during sign-out:", error);
      alert("Sign-out failed. Please try again.");
    }
  };

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleStartCampaign = () => {
    navigate("/home"); // Navigate to home page after clicking "Start a Campaign"
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-full mr-2 " />
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <button
              onClick={handleSignIn}
              className="px-4 py-2 text-[#ffde59] font-epilogue hover:scale-110 transition"
            >
              Sign In
            </button>
          ) : (
            <>
              <button
                onClick={handleStartCampaign}
                className="px-4 py-2 text-[#ffde59]  hover:scale-110 transition"
              >
                Start a Campaign
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-[#ffde59]  hover:scale-110 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
