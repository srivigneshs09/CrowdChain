import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#ffde59] text-black py-12 px-8 rounded-t-[250px] font-epilogue">
      <div className="container mx-auto space-y-8">
        {/* Join the Impact Community Section */}
        <div className="text-left mb-8 px-8">
          <h3 className="text-3xl font-semibold text-center mb-4">Join The CrowdChain Community</h3>
          <p className="text-md mb-6">Crowdchain is an online technology platform connecting donors and donees. We do not provide any financial return in any form whatsoever, including but not limited to financial securities (debt or equity), interest, dividend, profit share, rewards in cash, to individuals who make payments on the Platform.</p>
        </div>

        {/* Right-Aligned Sections (Subscribe & Follow Us) */}
        <div className="flex justify-between items-start px-8">
          {/* Email & Subscribe Section */}
          <div className="flex flex-col items-start space-y-4 w-1/2 text-center">
            <p className="text-lg font-semibold mb-4">Subscribe to our newsletter for updates:</p>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md border text-black"
              />
              <button className="px-6 py-2 text-black rounded-md hover:scale-110">Subscribe</button>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="flex flex-col items-start space-y-4 w-1/2 text-center">
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-6 text-xl text-black">
              <a href="#" className="hover:scale-110">
                <FaFacebook />
              </a>
              <a href="#" className="hover:scale-110">
                <FaTwitter />
              </a>
              <a href="#" className="hover:scale-110">
                <FaInstagram />
              </a>
              <a href="#" className="hover:scale-110">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links Section */}
        <div className="text-center mt-8">
          <div className="text-sm text-gray-400 space-x-4">
            <a href="#" className="hover:text-black">Terms of Use</a>
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Raise a Concern</a>
            <a href="#" className="hover:text-black">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
