import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, HowItWorks, Login } from './pages';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import Contact from '../src/routes/Contact'
import crw from './routes/crw';
const App = () => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{ redirect_uri: window.location.origin || "http://localhost:5173" }}
    >
      <div className="relative sm:-8 p-4 gradient-bg-welcome min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 text-white" >
          <Navbar />

          <Routes>
            <Route path="/" element={<ProtectedRoute component={crw} />} />
            <Route path="/dashboard" element={<ProtectedRoute component={Home} />} />
            <Route path="/how-it-works" element={<ProtectedRoute component={HowItWorks} />} />
            <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
            <Route path="/contact" element={<ProtectedRoute component={Contact} />} />
            <Route path="/create-campaign" element={<ProtectedRoute component={CreateCampaign} />} />
            <Route path="/campaign-details/:id" element={<ProtectedRoute component={CampaignDetails} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Auth0Provider>
  );
};

// A component to protect routes that require login
const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!isAuthenticated) {
    loginWithRedirect(); // Redirect to Auth0 login page if not authenticated
    return null;
  }

  return <Component />;
};

export default App;
