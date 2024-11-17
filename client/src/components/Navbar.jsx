import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo3, menu } from '../assets';
import { navlinks } from '../constants';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm shadow-sm">
      <div className="flex md:flex-row flex-col-reverse justify-between items-center px-4 py-3 md:px-8 md:py-4">
        {/* Logo in the center */}
        <div className="flex-1 flex justify-center items-center">
          <img src={logo3} alt="Logo" className="h-[50px] object-contain" />
        </div>

        {/* Button for larger screens */}
        <div className="hidden sm:flex gap-4 justify-center items-center">
          <button
            className="text-[#ffde59] text-lg font-normal hover:scale-110"
            onClick={() => {
              if (address) navigate('create-campaign');
              else connect();
            }}
          >
            {address ? 'Create a campaign' : 'Connect'}
          </button>
        </div>

        {/* Small screen navigation */}
        <div className="sm:hidden flex justify-between items-center w-full relative">
          <img
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />
          <div
            className={`absolute top-[60px] right-0 left-0 backdrop-blur-sm z-10 shadow-secondary py-4 ${
              !toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'
            } transition-all duration-700`}
          >
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && 'bg-[#f0f0f0]'}`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${
                      isActive === link.name ? 'grayscale-0' : 'grayscale'
                    }`}
                  />
                  <p
                    className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                      isActive === link.name ? 'text-black' : 'text-black'
                    }`}
                  >
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex mx-4">
              <button
                className="text-[#ffde59] text-sm font-semibold hover:underline"
                onClick={() => {
                  if (address) navigate('create-campaign');
                  else connect();
                }}
              >
                {address ? 'Create a campaign' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
