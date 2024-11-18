import React from 'react';
import {process} from '../assets';

const HowWorks = () => {
  return (
    <section className="py-16 px-8 font-epilogue">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-black mb-4">How Crowdfunding Works</h2>
        <p className="text-xl text-gray-600">
          Crowdfunding enables individuals and organizations to raise funds by pooling small contributions from many people. Here's how it works:
        </p>
      </div>

      {/* Main Content with Image */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Image Section */}
        <div className="w-full mb-20">
        <img
          src={process} // Replace with the correct image path
          alt="Crowdfunding Process"
          className="w-full h-auto"
        />
      </div>
      </div>
    </section>
  );
};

export default HowWorks;
