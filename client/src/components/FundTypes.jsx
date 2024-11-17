import React, { useState } from 'react';
import { FaHeartbeat, FaSchool, FaHome ,FaDesktop, FaLightbulb, FaTools, FaBuilding} from 'react-icons/fa'; // Example icons for illustration
import { motion } from 'framer-motion'; // For smooth transition animations

const FundTypes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of different types of fundraisers
  const fundTypes = [
    {
      title: 'Medical Fundraising',
      description: 'Get emergency financial help to pay hospital bills and medication bills with online fundraising.',
      icon: <FaHeartbeat size={100} className="text-black" />,
      bgColor: '#ffffff',
    },
    {
      title: 'Education Fundraising',
      description: 'Raise funds for tuition, books, and other education-related expenses with the support of donors.',
      icon: <FaSchool size={100} className="text-black" />,
      bgColor: '#ffffff',
    },
    {
      title: 'Personal Fundraising',
      description: 'Whether it’s for an emergency, family support, or special occasion, raise funds for personal needs.',
      icon: <FaHome size={100} className="text-black" />,
      bgColor: '#ffffff',
    },
    {
      title: 'PC Building Fundraising',
      description: 'Get financial support for building Personal Computers',
      icon: <FaDesktop size={100} className="text-black" />,
      bgColor: '#ffffff',
    },
    {
      title: 'Startup Idea Fundraising',
      description: 'Raise funds to Start a New Company.',
      icon: <FaBuilding size={100} className="text-black" />,
      bgColor: '#ffffff',
    },
    {
      title: 'Project Fundraising',
      description: 'Project fundraising to complete the project needs such as hardware components.',
      icon: <FaTools size={100} className="text-black" />,
      bgColor: '#ffffff',
    },
  ];

  // Handle next card group
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % fundTypes.length); // Adjusted to show 3 cards
  };

  // Handle previous card group
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 3 + fundTypes.length) % fundTypes.length // Adjusted to show 3 cards
    );
  };

  return (
    <section className="py-20 px-6 font-epilogue">
      <div className="text-center mb-10">
        <h2 className="text-6xl font-bold text-black mb-4">
          Raise Funds for Health, Education, and Others on CrowdChain
        </h2>
        <p className="text-xl text-black">
          Get emergency financial help to pay bills and medication bills with online fundraising.
        </p>
      </div>

      <div className="relative">
        <motion.div
          key={currentIndex}
          className="flex gap-6 md:gap-10 justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {/* Fund Type Cards - Display 3 cards at once */}
          {fundTypes.slice(currentIndex, currentIndex + 3).map((fundType, index) => (
            <div
              key={index}
              className="w-full sm:w-[280px] md:w-[300px] h-[400px] p-6 rounded-lg shadow-xl bg-white"
              style={{ backgroundColor: fundType.bgColor }}
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-30 rounded-lg" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div>{fundType.icon}</div>
                <h3 className="text-xl text-black font-bold mt-4">{fundType.title}</h3>
                <p className="text-black mt-4 text-center">{fundType.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4">
          <button
            className="p-3 bg-gray-800 text-white rounded-full shadow-xl"
            onClick={handlePrev}
          >
            &#8249;
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4">
          <button
            className="p-3 bg-gray-800 text-white rounded-full shadow-xl"
            onClick={handleNext}
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default FundTypes;
