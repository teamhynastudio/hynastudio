import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlatformSection from './components/PlatformSection';
import KeyFeatures from './components/KeyFeatures';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        <Hero />
        <PlatformSection />
        <KeyFeatures />
      </main>
      
    </div>
  );
}

export default App;
