import React from 'react';
import Header from './header/Header';
import HeroSection from './heroSection/HeroSection';
import FeaturesSection from './featuresSection/FeaturesSection';
import Footer from './footer/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default HomePage;
