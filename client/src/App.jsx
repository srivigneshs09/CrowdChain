import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, HowItWorks } from './pages';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const App = () => {
  return (
      <div className="relative sm:-8 p-4 bg-[#ffffff] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />

          <Routes>
            <Route path="/" element={<ProtectedRoute component={Home} />} />
            <Route path="/how-it-works" element={<ProtectedRoute component={HowItWorks} />} />
            <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
            <Route path="/create-campaign" element={<ProtectedRoute component={CreateCampaign} />} />
            <Route path="/campaign-details/:id" element={<ProtectedRoute component={CampaignDetails} />} />
          </Routes>
        </div>
      </div>
  );
};

// A component to protect routes that require login
const ProtectedRoute = ({ component: Component }) => {
  return <Component />;
};

export default App;
