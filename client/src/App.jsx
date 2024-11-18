import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, HowItWorks } from './pages';
import FrontPage from './pages/Front'; // Importing the FrontPage
import { auth } from './config/auth-firebase'; // Firebase auth instance

const App = () => {
  const location = useLocation(); // Access the current route
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state for smoother transitions

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Set authenticated to true if there's a user
      setIsLoading(false); // Stop loading once authentication is checked
    });
    return () => unsubscribe();
  }, []);

  const showSidebar = [
    '/home',
    '/how-it-works',
    '/profile',
    '/create-campaign',
    '/campaign-details/:id',
  ];

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading spinner or message while checking auth state
  }

  return (
    <div className="relative sm:-8 p-4 bg-[#ffffff] min-h-screen flex flex-row">
      {/* Conditionally render Sidebar based on route */}
      {isAuthenticated && showSidebar.includes(location.pathname) && (
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
      )}

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<FrontPage />} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute component={Home} isAuthenticated={isAuthenticated} withNavbar />} />
          <Route path="/home/how-it-works" element={<ProtectedRoute component={HowItWorks} isAuthenticated={isAuthenticated} withNavbar />} />
          <Route path="/home/profile" element={<ProtectedRoute component={Profile} isAuthenticated={isAuthenticated} withNavbar />} />
          <Route path="/home/create-campaign" element={<ProtectedRoute component={CreateCampaign} isAuthenticated={isAuthenticated} withNavbar />} />
          <Route path="/home/campaign-details/:id" element={<ProtectedRoute component={CampaignDetails} isAuthenticated={isAuthenticated} withNavbar />} />
        </Routes>
      </div>
    </div>
  );
};

// A component to protect routes that require login
const ProtectedRoute = ({ component: Component, isAuthenticated, withNavbar }) => {
  if (!isAuthenticated) {
    // Redirect to '/' if the user is not logged in
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      {withNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Component />
    </div>
  );
};

export default App;
