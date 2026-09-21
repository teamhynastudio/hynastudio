import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlatformSection from './components/PlatformSection';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        <Hero />
        <PlatformSection />
      </main>
      
    </div>
  );
}

export default App;
