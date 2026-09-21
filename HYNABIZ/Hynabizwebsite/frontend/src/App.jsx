import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlatformSection from './components/PlatformSection';
import CTASection from './components/CTASection';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        <Hero />
        <PlatformSection />
        <CTASection />
      </main>
      
    </div>
  );
}

export default App;
