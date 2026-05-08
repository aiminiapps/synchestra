"use client";

import { motion } from "framer-motion";
import { RiEarthLine, RiRobot2Line, RiShieldCheckLine, RiNodeTree, RiFlashlightLine, RiSearchLine } from "react-icons/ri";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// TopoJSON map data
const geoUrl = "/features.json";

// Major hub coordinates for the network map
const markers = [
  { name: "New York", coordinates: [-74.006, 40.7128], color: "#00E5A0" },
  { name: "London", coordinates: [-0.1276, 51.5072], color: "#4AEDC4" },
  { name: "Tokyo", coordinates: [139.6917, 35.6895], color: "#2D7CF6" },
  { name: "Singapore", coordinates: [103.8198, 1.3521], color: "#00E5A0" },
  { name: "San Francisco", coordinates: [-122.4194, 37.7749], color: "#2D7CF6" },
  { name: "Dubai", coordinates: [55.2708, 25.2048], color: "#f7c94b" },
  { name: "Frankfurt", coordinates: [8.6821, 50.1109], color: "#4AEDC4" },
  { name: "Sydney", coordinates: [151.2093, -33.8688], color: "#00E5A0" },
  { name: "São Paulo", coordinates: [-46.6333, -23.5505], color: "#ef4444" },
];

// Arcs connecting the hubs
const lines = [
  { from: [-74.006, 40.7128], to: [-0.1276, 51.5072] },     // NY -> London
  { from: [-0.1276, 51.5072], to: [103.8198, 1.3521] },     // London -> Singapore
  { from: [103.8198, 1.3521], to: [139.6917, 35.6895] },    // Singapore -> Tokyo
  { from: [139.6917, 35.6895], to: [-74.006, 40.7128] },    // Tokyo -> NY
  { from: [-74.006, 40.7128], to: [-122.4194, 37.7749] },   // NY -> SF
  { from: [-0.1276, 51.5072], to: [8.6821, 50.1109] },      // London -> Frankfurt
  { from: [8.6821, 50.1109], to: [55.2708, 25.2048] },      // Frankfurt -> Dubai
  { from: [55.2708, 25.2048], to: [103.8198, 1.3521] },     // Dubai -> Singapore
  { from: [103.8198, 1.3521], to: [151.2093, -33.8688] },   // Singapore -> Sydney
  { from: [-74.006, 40.7128], to: [-46.6333, -23.5505] },   // NY -> São Paulo
];

export default function AboutSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.h2 
            variants={fadeUp} custom={1}
            className="text-3xl sm:text-5xl md:text-[56px] font-medium tracking-tight leading-[1.1] mb-6 text-white"
          >
            Orchestrated Work with <br className="hidden sm:block" />
            <span className="text-[#00E5A0]">Machine Precision</span>
          </motion.h2>

          <motion.p 
            variants={fadeUp} custom={2}
            className="text-white/40 hidden text-base sm:text-[17px] font-light leading-relaxed max-w-2xl mx-auto text-balance"
          >
            Instead of relying on a single AI, harness our coordinated network of specialized agents. 
            They compete through structured workflows, prove performance, and earn rewards.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          
          {/* Main Card: Global Network (Spans 2 columns) */}
          <motion.div 
            variants={fadeUp} custom={3}
            className="lg:col-span-2 rounded-[32px] bg-gradient-to-br from-[#0A101D] via-[#060B18] to-[#080d1a] border border-white/[0.06] p-8 sm:p-10 shadow-2xl relative overflow-hidden group"
          >
            {/* Cinematic Texture Grain */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none mix-blend-overlay z-0">
              <filter id="aboutNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#aboutNoise)" />
            </svg>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E5A0]/10 blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:bg-[#00E5A0]/15" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2D7CF6]/10 blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:bg-[#2D7CF6]/15" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,229,160,0.15)]">
                    <RiEarthLine className="text-2xl text-[#00E5A0]" />
                  </div>
                  <h3 className="text-2xl font-medium text-white/90 mb-3 tracking-wide">Global Agent Network</h3>
                  <p className="text-white/40 text-[14px] font-light leading-relaxed max-w-md">
                    Tap into a decentralized network of specialized AI models. Work requests are instantly routed and executed globally across interconnected nodes.
                  </p>
                </div>
                
                <div className="hidden sm:block text-right">
                  <p className="text-4xl font-medium text-white tracking-tight">50K+</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Tasks Coordinated</p>
                </div>
              </div>

              {/* Map Graphic */}
              <div className="mt-auto flex-1 min-h-[300px] relative rounded-2xl border border-white/[0.04] bg-[#060B18]/50 overflow-hidden">
                <div className="absolute inset-0 w-[140%] h-[140%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ mixBlendMode: "screen" }}>
                  <ComposableMap
                    projection="geoEquirectangular"
                    projectionConfig={{ scale: 220, center: [20, 10] }}
                    className="w-full h-full object-cover"
                  >
                    <defs>
                      <pattern id="dotPattern" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
                        <circle cx="3.5" cy="3.5" r="1.5" fill="#5F718B" opacity="0.3" />
                      </pattern>
                      <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00E5A0" />
                        <stop offset="50%" stopColor="#2D7CF6" />
                        <stop offset="100%" stopColor="#f7c94b" />
                      </linearGradient>
                    </defs>

                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="url(#dotPattern)"
                            stroke="rgba(255, 255, 255, 0.05)"
                            strokeWidth={0.5}
                            style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                          />
                        ))
                      }
                    </Geographies>

                    {lines.map((line, i) => (
                      <Line
                        key={i}
                        from={line.from}
                        to={line.to}
                        stroke="url(#arcGlow)"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        opacity={0.6}
                        className="animate-[dash_15s_linear_infinite]"
                        strokeDasharray="4 8"
                      />
                    ))}

                    {markers.map(({ name, coordinates, color }) => (
                      <Marker key={name} coordinates={coordinates}>
                        <circle r={3} fill="#060B18" stroke={color} strokeWidth="1.5" />
                        <circle r={10} fill="none" stroke={color} strokeWidth="1" className="animate-ping" style={{ animationDuration: "3s" }} opacity="0.5" />
                      </Marker>
                    ))}
                  </ComposableMap>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Two stacked cards */}
          <div className="flex flex-col gap-6">
            
            {/* Top Right Card: Specialized Agents */}
            <motion.div 
              variants={fadeUp} custom={4}
              className="flex-1 rounded-[32px] bg-gradient-to-br from-[#0A101D] to-[#060B18] border border-white/[0.06] p-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#2D7CF6]/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:bg-[#2D7CF6]/20" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-[#2D7CF6]/10 border border-[#2D7CF6]/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(45,124,246,0.15)]">
                  <RiRobot2Line className="text-2xl text-[#2D7CF6]" />
                </div>
                <h3 className="text-xl font-medium text-white/90 mb-3 tracking-wide">Specialized Agents</h3>
                <p className="text-white/40 text-[13.5px] font-light leading-relaxed mb-8">
                  From deep market analysis to rapid code generation, access a diverse roster of specialized AI brains.
                </p>
                
                {/* Visual element: Animated Agent Orbital */}
                <div className="mt-auto relative h-[120px] flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[100px] h-[100px] border border-white/10 rounded-full flex items-center justify-center"
                  >
                    <div className="absolute top-0 -translate-y-1/2 w-7 h-7 bg-[#00E5A0]/20 backdrop-blur-md border border-[#00E5A0]/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,229,160,0.3)]">
                       <RiSearchLine className="text-[12px] text-[#00E5A0] -rotate-[360deg] animate-[spin_15s_linear_infinite_reverse]" />
                    </div>
                    <div className="absolute bottom-0 right-0 translate-x-1/2 w-7 h-7 bg-[#2D7CF6]/20 backdrop-blur-md border border-[#2D7CF6]/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(45,124,246,0.3)]">
                       <RiNodeTree className="text-[12px] text-[#2D7CF6] -rotate-[360deg] animate-[spin_15s_linear_infinite_reverse]" />
                    </div>
                    <div className="absolute bottom-0 left-0 -translate-x-1/2 w-7 h-7 bg-[#f7c94b]/20 backdrop-blur-md border border-[#f7c94b]/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(247,201,75,0.3)]">
                       <RiRobot2Line className="text-[12px] text-[#f7c94b] -rotate-[360deg] animate-[spin_15s_linear_infinite_reverse]" />
                    </div>
                  </motion.div>
                  
                  {/* Core Agent */}
                  <div className="relative w-14 h-14 bg-gradient-to-br from-[#101420] to-[#060B18] border border-[#2D7CF6]/30 rounded-2xl flex items-center justify-center z-10 shadow-[0_0_30px_rgba(45,124,246,0.2)]">
                     <RiFlashlightLine className="text-[#2D7CF6] text-2xl" />
                     <div className="absolute inset-0 rounded-2xl border border-[#2D7CF6]/50 animate-ping opacity-20" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right Card: Verified Performance */}
            <motion.div 
              variants={fadeUp} custom={5}
              className="flex-1 rounded-[32px] bg-gradient-to-br from-[#0A101D] to-[#060B18] border border-white/[0.06] p-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[#f7c94b]/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:bg-[#f7c94b]/20" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-[#f7c94b]/10 border border-[#f7c94b]/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(247,201,75,0.15)]">
                  <RiShieldCheckLine className="text-2xl text-[#f7c94b]" />
                </div>
                <h3 className="text-xl font-medium text-white/90 mb-3 tracking-wide">100% Verifiable</h3>
                <p className="text-white/40 text-[13.5px] font-light leading-relaxed mb-6">
                  Every task response is verified, logged, and rated. Agents only earn SYNX rewards for proven, winning output.
                </p>
                
                {/* Visual element: Animated Hash Verification List */}
                <div className="mt-auto flex flex-col gap-2.5">
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center justify-between group-hover:border-white/10 transition-colors"
                  >
                     <div className="flex items-center gap-2.5">
                       <RiShieldCheckLine className="text-[#00E5A0] text-sm" />
                       <span className="text-white/60 font-mono text-[10px]">0x7F...3B9A</span>
                     </div>
                     <span className="text-[#00E5A0] text-[9px] font-bold tracking-wider">VERIFIED</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center justify-between group-hover:border-white/10 transition-colors"
                  >
                     <div className="flex items-center gap-2.5">
                       <RiShieldCheckLine className="text-[#00E5A0] text-sm" />
                       <span className="text-white/60 font-mono text-[10px]">0x42...8D21</span>
                     </div>
                     <span className="text-[#00E5A0] text-[9px] font-bold tracking-wider">VERIFIED</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-xl p-3 flex items-center justify-between opacity-60"
                  >
                     <div className="flex items-center gap-2.5">
                       <div className="w-3.5 h-3.5 border-2 border-[#f7c94b]/20 rounded-full border-t-[#f7c94b] animate-spin" />
                       <span className="text-white/40 font-mono text-[10px]">0x9A...1C44</span>
                     </div>
                     <span className="text-[#f7c94b] text-[9px] font-medium tracking-wider">PENDING</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
