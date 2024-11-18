import React from 'react';
import { head } from '../assets'; // Replace with the correct path to your image

const Why = () => {
  return (
    <section className="flex items-center justify-between py-20 px-6 font-epilogue">
      {/* Left Image with Rounded Corners */}
      <div className="w-2/3">
        <img
          src={head} // Replace with the correct image path
          alt="Crowdfunding for Medical Treatment"
          className="w-full h-full rounded-full shadow-xl"
        />
      </div>

      {/* Right Text Section */}
      <div className="w-2/3 pl-12">
        <h2 className="text-6xl font-bold text-black mb-6">
          You Can Choose Fundraising with CrowdChain if...
        </h2>
        <ul className="list-disc pl-6 text-lg text-black space-y-4">
          <li>You need funds urgently for medical treatment.</li>
          <li>You have limited savings to cover unexpected medical expenses.</li>
          <li>Traditional medical loans and insurance are not enough to cover your needs.</li>
        </ul>
        <p className='text-black pt-3'>Get financial help for medical treatment by raising funds with the support of donors and well-wishers online.</p>
      </div>
    </section>
  );
};

export default Why;
