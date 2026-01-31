import React from 'react';
import { StudioProvider } from '../context/StudioContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import CSS!
import StudioDashboard from '../StudioDashboard';

// You might need to install 'lucide-react' if not already present for icons used in StudioDashboard
// npm install lucide-react

function HomePage() {
  return (
    <StudioProvider>
      {/* 1. Added 'z-[9999]' to ensure Toasts appear above all Modals 
          2. Imported the CSS for Toastify (crucial if you haven't elsewhere)
      */}
      <ToastContainer 
        className="z-[9999]" 
        position="top-right"
        autoClose={3000}
        theme="dark"
        limit={3} // Prevents screen clutter if too many errors occur
      />

      {/* Main Background Container */}
      {/* Updated background to a dark mode gradient as per the request */}
      <div className="h-screen w-screen relative overflow-hidden bg-[#111111] text-zinc-200 font-sans selection:bg-blue-500/30">
        
        {/* Background Effects Layer - Optional visual enhancement */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px]" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full w-full">
          <StudioDashboard />
        </div>
        
      </div>
    </StudioProvider>
  );
}

export default HomePage;