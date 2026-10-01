import React from 'react';
import PageHero from '../components/PageHero';

const Inventory = () => {
  return (
    <div className="page-container">
      <PageHero 
        title="Inventory Management" 
        subtitle="Keep your operations smooth with real-time inventory tracking and automated alerts."
        accentColor="#00D09C"
      />
    </div>
  );
};

export default Inventory;
