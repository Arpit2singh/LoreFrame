import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Terminal, Zap, BarChart3,
  Code2, Cpu, Globe, Sparkles, Aperture,
  Layers, ScanLine, Hexagon, Component,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashFront = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate(); // Hook for redirection

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden relative font-sans selection:bg-cyan-500 selection:text-white perspective-[2000px]">

      {/* ====================
          BACKGROUND LAYERS 
         ==================== */}

      {/* 1. Deep Space Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() < 0.5 ? '1px' : '2px',
              height: Math.random() < 0.5 ? '1px' : '2px',
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* 2. Moving Cyber Grid Floor (Forward Momentum Only) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
        <motion.div
          className="absolute -left-[50%] -right-[50%] -bottom-[100%] h-[200%] origin-top"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'rotateX(80deg) translateZ(-100px)',
            maskImage: 'linear-gradient(to top, black, transparent 80%)'
          }}
          animate={{
            translateY: [0, 80]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* 3. The "Aurora" Glow (Interactive Spotlight) */}
      <motion.div
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 30 }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* ====================
             MAIN CONTENT 
         ==================== */}

      {/* Main Container - No longer rotates the whole screen */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* NAVBAR */}
        <nav className="relative z-50 flex justify-between items-center px-6 py-6 max-w-[1400px] w-full mx-auto">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 bg-[#0a0f1e] rounded-xl flex items-center justify-center border border-white/10 ring-1 ring-white/5">
                <LayoutDashboard size={24} className="text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight leading-none">Lorven<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI</span></span>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Generative Engine</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
            {['Features', 'Gallery', 'Pricing', 'Docs'].map((item) => (
              <a key={item} href="#" className="px-5 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
                {item}
              </a>
            ))}
          </div>

          <button className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 transition-all">
            <Terminal size={16} />
            <span>Console Access</span>
          </button>
        </nav>


        {/* HERO SECTION */}
        <main className="flex-grow flex flex-col justify-center items-center relative max-w-[1600px] mx-auto w-full px-6 pt-10 pb-20">

          <div className="grid lg:grid-cols-12 gap-12 w-full items-center">

            {/* LEFT COLUMN: TEXT */}
            <div className="lg:col-span-7 space-y-10 text-left relative z-20">

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0f172a]/80 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(79,70,229,0.15)] backdrop-blur-xl"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                System Operational
                <div className="h-4 w-[1px] bg-indigo-500/30 mx-1" />
                <span className="text-slate-400">Latency: 12ms</span>
              </motion.div>

              {/* MAIN GLITCH TITLE */}
              <div className="relative">
                <motion.h1
                  className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] text-white mix-blend-normal"
                >
                  IMAGINE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-gradient-xy">
                    BOLDLY.
                  </span>
                </motion.h1>

                {/* Glitch Overlay Effect */}
                <motion.h1
                  className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] text-cyan-500 absolute top-0 left-0 opacity-0 pointer-events-none"
                  animate={{
                    opacity: [0, 0.5, 0, 0.3, 0],
                    x: [0, -2, 0, 2, 0],
                    clipPath: ['inset(10% 0 0 0)', 'inset(80% 0 0 0)', 'inset(20% 0 0 0)']
                  }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                >
                  IMAGINE <br /> BOLDLY.
                </motion.h1>
              </div>

              <motion.h2
                className="text-4xl md:text-6xl font-light tracking-tight text-slate-300"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Generate <span className="text-white font-semibold italic">Freely.</span>
              </motion.h2>

              <p className="text-lg text-slate-400 max-w-xl leading-relaxed border-l-2 border-indigo-500/50 pl-6">
                One Identity. Infinite Worlds. Generate thousands of consistent photos and high-fidelity videos from just one upload. Swap Backgrounds. Preserve Faces. Create Instantly.
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-5">
                <button
                  onClick={() => navigate('/Tool')}
                  className="group relative px-8 py-4 bg-white text-black rounded-lg font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <Link
                    to="/Tool"  // <--- This is the format
                    className="group relative px-8 py-4 bg-white text-black rounded-lg font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] inline-flex" // Added inline-flex to keep alignment
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <span className="relative flex items-center gap-3">
                      Start Creating <Sparkles size={18} className="text-indigo-600" />
                    </span>
                  </Link>
                </button>

                <button className="group px-8 py-4 bg-transparent border border-white/20 text-white rounded-lg font-bold text-lg hover:bg-white/5 hover:border-white/40 transition-all flex items-center gap-3 backdrop-blur-sm">
                  <Globe size={18} />
                  Explore The Hub
                </button>
              </div>
            </div>


            {/* RIGHT COLUMN: HOLOGRAPHIC INTERFACE (Still has depth, but no page tilt) */}
            <div className="lg:col-span-5 relative h-[600px] flex items-center justify-center perspective-[1000px] z-10">

              {/* ORBITAL RINGS */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-[500px] h-[500px] border border-slate-800 rounded-full"
                  style={{ rotateX: '60deg' }}
                  animate={{ rotateZ: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-[400px] h-[400px] border border-dashed border-indigo-500/20 rounded-full"
                  style={{ rotateX: '60deg' }}
                  animate={{ rotateZ: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* FLOATING CARD 1: MAIN PREVIEW */}
              <motion.div
                className="relative w-80 md:w-96 aspect-[4/5] bg-gradient-to-b from-slate-900/90 to-black/90 rounded-2xl border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden group z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05, translateY: -10 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex gap-2 text-xs text-slate-500 font-mono">
                    <ScanLine size={12} />
                    <span>PREVIEW_MODE</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="relative h-full w-full">
                  {/* The Image Generation Animation */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Scanning Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent h-[20%]"
                    animate={{ top: ['-20%', '120%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Grid Overlay on Image */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
                </div>

                {/* Floating Stats Pill */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex justify-between items-center">
                  <div className="text-xs">
                    <div className="text-slate-400">Rendering Time</div>
                    <div className="text-white font-mono">0.04s</div>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Aperture className="text-cyan-400" size={20} />
                  </motion.div>
                </div>
              </motion.div>


              {/* FLOATING CARD 2: PROMPT CONSOLE (Drifting animation only, no page tilt) */}
              <motion.div
                className="absolute -right-8 md:-right-12 top-20 w-64 bg-[#0a0f1e]/90 border border-indigo-500/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl z-30"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2 mb-3 text-indigo-300 text-xs font-bold tracking-wider">
                  <Terminal size={12} />
                  INPUT_PROMPT
                </div>
                <p className="text-sm font-mono text-slate-300 leading-relaxed">
                  <span className="text-pink-500"></span> cyberpunk city,
                  <span className="text-cyan-400"> neon lights</span>,
                  rain reflection,
                  <span className="text-yellow-400"> volumetric fog</span>...
                  <span className="animate-pulse inline-block w-2 h-4 bg-indigo-500 align-middle ml-1" />
                </p>
              </motion.div>


              {/* FLOATING CARD 3: ASSET LIBRARY */}
              <motion.div
                className="absolute -left-8 md:-left-12 bottom-32 w-56 bg-[#0a0f1e]/90 border border-cyan-500/30 rounded-xl p-3 shadow-2xl backdrop-blur-xl z-10"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-cyan-300">ASSETS_LOADED</span>
                  <Layers size={12} className="text-cyan-500" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-square rounded bg-slate-800/50 border border-white/5 hover:bg-cyan-500/20 transition-colors" />
                  ))}
                </div>
              </motion.div>

              {/* Decorative Floating Hexagon */}
              <motion.div
                className="absolute -top-10 left-0 text-slate-700/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Hexagon size={64} strokeWidth={1} />
              </motion.div>

            </div>
          </div>
        </main>

        {/* FOOTER STRIP */}
        <footer className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-wrap justify-center md:justify-between items-center gap-6">

            <div className="flex gap-8">
              <Feature icon={<Zap size={16} />} text="Instant Renders" />
              <Feature icon={<Component size={16} />} text="API Ready" />
              <Feature icon={<Share2 size={16} />} text="Collab Mode" />
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-sm font-mono">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              SERVER_STATUS: ONLINE
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
};

const Feature = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group">
    <div className="p-1.5 rounded-md bg-white/5 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
      {icon}
    </div>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default DashFront;