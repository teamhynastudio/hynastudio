import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HynaBizAI from './components/HynaBizAI';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        <Hero />
        <HynaBizAI />
      </main>
      
    </div>
  );
}

export default App;
