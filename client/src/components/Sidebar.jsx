import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook
import { logo1, sun } from '../assets';
import { navlinks } from '../constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div 
    className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#ffde59]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} 
    onClick={handleClick}
  >
    <img src={imgUrl} alt={`${name}_icon`} className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
  </div>
);

const Sidebar = () => {
  const { logout } = useAuth0(); // Get logout function from Auth0
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');

  const handleLogout = () => {
    logout({ returnTo: window.location.origin }); // Log out and redirect to homepage
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[190px] h-[210px] -mr-10 -mb-10 -ml-10" imgUrl={logo1} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#ffde59] rounded-[20px] w-[76px] py-4 mt-12 -mr-15 shadow-secondary">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (link.name === 'logout') {
                  handleLogout(); // Call logout function
                } else if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon styles="bg-[#ffde59]" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
