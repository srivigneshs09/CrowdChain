import React from 'react';
import { Navbar } from '../comp';

const About = () => {
  return (
    <>
    
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-blue-600 to-gray-900 text-white p-8">
        <Navbar/>
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">About Us</h1>
          <p className="text-lg md:text-xl mb-6">
            Welcome to CrowdChain, the next-generation crowdfunding platform. We combine cutting-edge technology with a commitment to security, reliability, and innovation.
          </p>
          <p className="text-lg md:text-xl mb-6">
            Powered by Ethereum and integrated with Web 3.0, our platform offers low-cost, transparent, and secure crowdfunding solutions. We’re here to help you turn ideas into reality with confidence and ease.
          </p>
          <p className="text-lg md:text-xl mb-6">
            Join us and be part of a future where crowdfunding is more accessible, transparent, and secure than ever before.
          </p>
  
          {/* New section added here */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="text-lg md:text-xl mb-6 list-disc list-inside">
            <li className="mb-3">
              <span className="font-semibold">Unmatched Reliability:</span> We ensure that every campaign runs smoothly with 24/7 support and robust infrastructure.
            </li>
            <li className="mb-3">
              <span className="font-semibold">Top-Notch Security:</span> Your data and transactions are protected with advanced encryption and blockchain technology.
            </li>
            <li className="mb-3">
              <span className="font-semibold">Powered by Ethereum:</span> Experience the benefits of smart contracts for transparent and automated crowdfunding.
            </li>
            <li className="mb-3">
              <span className="font-semibold">Low-Cost Solutions:</span> We minimize fees to make sure more of your funds go directly to your project.
            </li>
            <li className="mb-3">
              <span className="font-semibold">Web 3.0 Integration:</span> Embrace the future with decentralized, user-centric technology that puts you in control.
            </li>
            <li className="mb-3">
              <span className="font-semibold">Blockchain Transparency:</span> Every transaction is secure and verifiable, providing an immutable record of your campaign’s success.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;
