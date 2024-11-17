// FrontPage.js
import React from 'react';
import { NavbarHome, Header, Why, FundTypes, Start, Define, HowWorks, Faqs, Footer } from '../components'; // Import NavbarHome component

const FrontPage = () => {
  return (
    <div>
      <NavbarHome />
      <Header />
      <Why />
      <FundTypes />
      <Start />
      <Define />
      <HowWorks />
      <Faqs />
      <Footer />
    </div>
  );
};

export default FrontPage;
