import React from 'react';
import PageHero from '../components/PageHero';
import SalesModule from '../components/SalesModule';

const Sales = () => {
  return (
    <div className="page-container bg-[#0B0F17]">
      <PageHero accentColor="#00D09C" subtitle="Accelerate your sales pipeline with AI-driven insights and automated workflows." title="Sales Management"/>
      <SalesModule/>
    </div>
  );
};

export default Sales;
