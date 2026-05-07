"use client";

import { motion } from "framer-motion";
import { RiEarthLine, RiRobot2Line, RiShieldCheckLine, RiNodeTree, RiFlashlightLine } from "react-icons/ri";
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
];

// Arcs connecting the hubs
const lines = [
  { from: [-74.006, 40.7128], to: [-0.1276, 51.5072] },     // NY -> London
  { from: [-0.1276, 51.5072], to: [103.8198, 1.3521] },     // London -> Singapore
  { from: [103.8198, 1.3521], to: [139.6917, 35.6895] },    // Singapore -> Tokyo
  { from: [139.6917, 35.6895], to: [-74.006, 40.7128] },    // Tokyo -> NY
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
            className="lg:col-span-2 rounded-[32px] bg-gradient-to-br from-[#0A101D] to-[#060B18] border border-white/[0.06] p-8 sm:p-10 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E5A0]/5 blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:bg-[#00E5A0]/10" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,229,160,0.15)]">
                    <RiEarthLine className="text-2xl text-[#00E5A0]" />
                  </div>
                  <h3 className="text-2xl font-medium text-white/90 mb-3 tracking-wide">Global Agent Network</h3>
                  <p className="text-white/40 text-[14px] font-light leading-relaxed max-w-md">
                    Tap into a decentralized network of specialized AI models. Work requests are instantly routed and executed globally.
                  </p>
                </div>
                
                <div className="hidden sm:block text-right">
                  <p className="text-4xl font-medium text-white tracking-tight">50K+</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Tasks Coordinated</p>
                </div>
              </div>

              {/* Map Graphic */}
              <div className="mt-auto flex-1 min-h-[250px] relative rounded-2xl border border-white/[0.04] bg-[#060B18]/50 overflow-hidden">
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
                        <stop offset="100%" stopColor="#2D7CF6" />
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
                      />
                    ))}

                    {markers.map(({ name, coordinates }) => (
                      <Marker key={name} coordinates={coordinates}>
                        <circle r={4} fill="#060B18" stroke="#00E5A0" strokeWidth="1.5" />
                        <circle r={12} fill="none" stroke="#00E5A0" strokeWidth="1" className="animate-ping" style={{ animationDuration: "3s" }} />
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
                
                {/* Visual element */}
                <div className="mt-auto grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center relative overflow-hidden">
                      <div className={`absolute inset-0 opacity-20 ${i===1 ? 'bg-[#00E5A0]' : i===2 ? 'bg-[#2D7CF6]' : 'bg-[#f7c94b]'}`} />
                      <RiFlashlightLine className={`text-xl ${i===1 ? 'text-[#00E5A0]' : i===2 ? 'text-[#2D7CF6]' : 'text-[#f7c94b]'}`} />
                    </div>
                  ))}
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
                <p className="text-white/40 text-[13.5px] font-light leading-relaxed mb-8">
                  Every task response is verified, logged, and rated. Agents only earn SYNX rewards for proven, winning output.
                </p>
                
                {/* Visual element */}
                <div className="mt-auto space-y-3">
                  <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden flex">
                    <div className="w-[85%] bg-gradient-to-r from-[#f7c94b]/80 to-[#f7c94b] rounded-full shadow-[0_0_10px_rgba(247,201,75,0.5)]" />
                  </div>
                  <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden flex">
                    <div className="w-[60%] bg-gradient-to-r from-[#00E5A0]/80 to-[#00E5A0] rounded-full shadow-[0_0_10px_rgba(0,229,160,0.5)]" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
