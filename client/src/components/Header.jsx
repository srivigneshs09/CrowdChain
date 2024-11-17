import React from 'react';
import { crowdfunding } from '../assets'; // Make sure to replace this with the correct path to your image

const Header = () => {
  return (
    <header className="flex items-center justify-between py-16 px-6 mt-20 font-epilogue">
    
      <div className="w-2/3 pl-12">
        <h1 className="text-7xl font-bold text-black mb-4">
          Empower Your Fundraising with Blockchain
        </h1>
        <p className="text-lg text-black mb-6">
          Our platform helps
          you raise funds from compassionate donors worldwide, ensuring every donation is tracked
          securely through the blockchain.
        </p>
      </div>
      <div className="w-full mb-20">
        <img
          src={crowdfunding} // Replace with the correct image path
          alt="Crowdfunding Platform"
          className="w-full h-auto rounded-full shadow-secondary"
        />
      </div>
    </header>
  );
};

export default Header;
