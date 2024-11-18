import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandsHelping, FaGlobe, FaShieldAlt, FaFileContract, FaLock } from 'react-icons/fa'; // Example icons

const Define = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of "Why is it Special?" points
  const specialPoints = [
    {
      title: 'Direct Contributions',
      description:
        'No banks or middlemen are involved. The money goes straight from the supporter to the project owner.',
      icon: <FaHandsHelping size={80} className="text-black" />,
      bgColor: '#ffffff',
    },
    {
      title: 'Global Access',
      description:
        'Anyone, anywhere in the world, can contribute using their smartphone or computer.',
      icon: <FaGlobe size={80} className="text-black" />,
      bgColor: '#ffffff',
    },
    {
      title: 'Transparency',
      description:
        'All transactions are recorded publicly on the blockchain, ensuring trust and accountability.',
      icon: <FaShieldAlt size={80} className="text-black" />,
      bgColor: '#ffffff',
    },
    {
      title: 'Security',
      description:
        'The technology is very secure, protecting both the supporters and the project owners from fraud.',
      icon: <FaLock size={80} className="text-black" />,
      bgColor: '#ffffff',
    },
    {
      title: 'Fairness',
      description:
        'Agreements are handled by smart contracts, which automatically enforce the terms of the deal without human interference.',
      icon: <FaFileContract size={80} className="text-black" />,
      bgColor: '#ffffff',
    },
  ];

  // Handle next card group
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % specialPoints.length);
  };

  // Handle previous card group
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 3 + specialPoints.length) % specialPoints.length
    );
  };

  return (
    <section className="flex flex-col items-center py-5 px-5 text-black font-epilogue">
      {/* Title Section */}
      <div className="w-full text-center mb-10">
        <h2 className="text-4xl font-semibold text-black mb-4">
          Understanding Blockchain-Based Crowdfunding
        </h2>
        <p className="text-xl text-black mb-8">
          Blockchain-based crowdfunding is a new way of raising money using modern technology. It allows people from all over the world to contribute directly to a project without needing banks or other middlemen.
        </p>
      </div>

      {/* Sliding Cards Section */}
      <div className="relative p-20">
        <motion.div
          key={currentIndex}
          className="flex gap-6 md:gap-10 justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {specialPoints.slice(currentIndex, currentIndex + 3).map((point, index) => (
            <div
              key={index}
              className="w-full sm:w-[280px] md:w-[300px] h-[350px] p-6 rounded-lg shadow-xl bg-white"
              style={{ backgroundColor: point.bgColor }}
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-30 rounded-lg" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div>{point.icon}</div>
                <h3 className="text-xl text-black font-bold mt-4">{point.title}</h3>
                <p className="text-black mt-4 text-center">{point.description}</p>
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

export default Define;
