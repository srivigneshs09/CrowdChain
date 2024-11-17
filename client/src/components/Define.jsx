import React from 'react';

const Define = () => {
  return (
    <section className="flex flex-col items-center py-5 px-5 text-black font-epilogue">
      <div className="w-full text-center mb-10">
        <h2 className="text-4xl font-semibold text-black mb-4">Understanding Crowdfunding</h2>
        <p className="text-xl text-black mb-8">
          Crowdfunding is a powerful method for raising money for projects or ventures. Let's explore the differences between traditional crowdfunding and blockchain-based crowdfunding.
        </p>
      </div>

      {/* Side-by-Side Layout for Features */}
      <div className="flex flex-wrap justify-between gap-8">
        {/* Normal Crowdfunding Features (Left) */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Normal Crowdfunding</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Platform Type</h4>
              <p>Centralized platforms (e.g., Kickstarter, Indiegogo)</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Currency Used</h4>
              <p>Traditional currencies (USD, EUR, etc.)</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Transaction Fees</h4>
              <p>Higher fees due to intermediaries (banks, platform fees)</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Transparency</h4>
              <p>Limited transparency, as the platform controls the data</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Global Reach</h4>
              <p>Limited by local regulations and currency restrictions</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Security</h4>
              <p>Depends on platform security measures</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Smart Contracts</h4>
              <p>No automated execution of agreements</p>
            </div>
          </div>
        </div>

        {/* Blockchain-Based Crowdfunding Features (Right) */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Blockchain-Based Crowdfunding</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Platform Type</h4>
              <p>Decentralized platforms, powered by blockchain networks</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Currency Used</h4>
              <p>Cryptocurrencies or platform-specific tokens (Bitcoin, Ethereum)</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Transaction Fees</h4>
              <p>Lower fees as blockchain eliminates intermediaries</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Transparency</h4>
              <p>High transparency, as all transactions are recorded on the blockchain</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Global Reach</h4>
              <p>Global participation without currency or geographic restrictions</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Security</h4>
              <p>High security due to the immutability of blockchain</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Smart Contracts</h4>
              <p>Smart contracts automatically enforce terms of investment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Define;
