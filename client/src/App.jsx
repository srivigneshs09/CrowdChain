import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, HowItWorks } from './pages';
import FrontPage from './pages/Front'; // Importing the FrontPage

const App = () => {
  const location = useLocation(); // Access the current route

  const showSidebar = [
    '/home', 
    '/how-it-works', 
    '/profile', 
    '/create-campaign', 
    '/campaign-details/:id'
  ];

  return (
    <div className="relative sm:-8 p-4 bg-[#ffffff] min-h-screen flex flex-row">
      {/* Conditionally render Sidebar based on route */}
      {showSidebar.includes(location.pathname) && (
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
      )}

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Routes>
          {/* FrontPage is shown when the app is first loaded */}
          <Route path="/" element={<FrontPage />} />

          {/* Always render Navbar on specific routes */}
          <Route path="/home" element={<ProtectedRoute component={Home} withNavbar />} />
          <Route path="/home/how-it-works" element={<ProtectedRoute component={HowItWorks} withNavbar />} />
          <Route path="/home/profile" element={<ProtectedRoute component={Profile} withNavbar />} />
          <Route path="/home/create-campaign" element={<ProtectedRoute component={CreateCampaign} withNavbar />} />
          <Route path="/home/campaign-details/:id" element={<ProtectedRoute component={CampaignDetails} withNavbar />} />
        </Routes>
      </div>
    </div>
  );
};

// A component to protect routes that require login
const ProtectedRoute = ({ component: Component, withNavbar }) => {
  return (
    <div>
      {withNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Component />
    </div>
  );
};

export default App;
