"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiArrowRightLine, 
  RiMicroscopeLine, 
  RiLineChartLine, 
  RiShieldCheckLine 
} from "react-icons/ri";
import { AGENTS } from "@/lib/agents";

const getAgentIcon = (slug) => {
  if (slug === 'research') return RiMicroscopeLine;
  if (slug === 'market') return RiLineChartLine;
  if (slug === 'risk') return RiShieldCheckLine;
  return RiMicroscopeLine;
};

// Placeholder descriptions for the layout if agent.description isn't available
const getAgentDescription = (slug) => {
  if (slug === 'research') return "Engineered for deep data mining and pattern recognition. Alpha Node rapidly parses gigabytes of unstructured data into verified insights.";
  if (slug === 'market') return "A highly optimized quantitative model. Nexus Agent constantly evaluates market conditions, executing advanced logic scoring with unparalleled speed.";
  if (slug === 'risk') return "The final layer of defense. Oracle Agent utilizes advanced cryptographic verification and fraud detection to guarantee output integrity.";
  return "Advanced AI coordination node.";
};

export default function MeetAgentsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeAgent = AGENTS[activeTab];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Headers & Tabs */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <div className="mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-[52px] font-medium text-white tracking-tight leading-[1.1] mb-6">
                The Intelligence Behind <br className="hidden sm:block" />
                <span className="text-[#00E5A0]">Every Decision</span>
              </h2>
              <p className="text-white/40 text-[15px] leading-relaxed font-light max-w-md">
                Three specialized autonomous agents working in tandem. 
                Select an agent to view their distinct parameters and verification capabilities.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {AGENTS.map((agent, i) => {
                const isActive = i === activeTab;
                const Icon = getAgentIcon(agent.slug);
                return (
                  <div 
                    key={agent.slug}
                    onClick={() => setActiveTab(i)}
                    className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-5 group ${
                      isActive 
                        ? "bg-white/[0.03] border-white/[0.08] shadow-[0_0_30px_rgba(255,255,255,0.02)]" 
                        : "bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/[0.02]"
                    }`}
                  >
                    {/* <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      isActive ? 'bg-white/10 shadow-inner' : 'bg-white/[0.02] group-hover:bg-white/[0.04]'
                    }`}>
                      <Icon className={`text-xl transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/50'}`} style={isActive ? { color: agent.avatarColor } : {}} />
                    </div> */}
                    <div>
                      <h4 className={`text-lg font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white/90' : 'text-white/40 group-hover:text-white/70'}`}>
                        {agent.name}
                      </h4>
                      <p className={`text-[12px] font-light mt-1 transition-colors duration-300 ${isActive ? 'text-white/50' : 'text-white/20'}`}>
                        {agent.specialty}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Agent Content Profile */}
          <div className="w-full lg:w-7/12 relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="relative rounded-[32px] bg-gradient-to-br from-[#0A101D] to-[#060B18] border border-white/[0.06] p-8 sm:p-12 shadow-2xl overflow-hidden min-h-[500px] flex flex-col"
              >
                {/* Tasteful, minimalist corner glow */}
                <div 
                  className="absolute -top-32 -right-32 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none opacity-[0.12]" 
                  style={{ backgroundColor: activeAgent.avatarColor }} 
                />
                
                {/* Decorative Tech Geometry */}
                <div className="absolute top-12 right-12 opacity-20 pointer-events-none hidden sm:block">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="29.5" stroke="currentColor" strokeDasharray="4 4" className="text-white/30 animate-spin-slow" />
                    <circle cx="30" cy="30" r="15.5" stroke="currentColor" strokeDasharray="2 4" className="text-white/20" />
                  </svg>
                </div>

                <div className="flex items-center gap-6 mb-12 relative z-10">
                  <div 
                    className="w-20 h-20 rounded-2xl border flex items-center justify-center shadow-xl" 
                    style={{ backgroundColor: `${activeAgent.avatarColor}08`, borderColor: `${activeAgent.avatarColor}20` }}
                  >
                    {(() => {
                      const ActiveIcon = getAgentIcon(activeAgent.slug);
                      return <ActiveIcon className="text-[32px]" style={{ color: activeAgent.avatarColor }} />
                    })()}
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1.5">{activeAgent.slug} protocol</p>
                    <h3 className="text-3xl font-medium text-white/90 tracking-wide">{activeAgent.name}</h3>
                  </div>
                </div>

                <div className="space-y-10 relative z-10 flex-1">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-3">Core Directive</p>
                    <p className="text-[15px] text-white/60 leading-[1.7] font-light max-w-lg">
                      {getAgentDescription(activeAgent.slug)}
                    </p>
                  </div>
                  
                  {/* Stats / Parameters Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#060B18]/50 border border-white/[0.04]">
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2.5">Success Rate</p>
                      <p className="text-2xl font-medium text-white tracking-tight">
                        {activeAgent.slug === 'research' ? '98.4%' : activeAgent.slug === 'market' ? '96.2%' : '99.9%'}
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#060B18]/50 border border-white/[0.04]">
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2.5">Response Time</p>
                      <p className="text-2xl font-medium text-white tracking-tight">
                        {activeAgent.slug === 'research' ? '1.2s' : activeAgent.slug === 'market' ? '0.8s' : '0.4s'}
                      </p>
                    </div>
                    <div className="col-span-2 p-5 rounded-2xl bg-[#060B18]/50 border border-white/[0.04]">
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3.5">System Capabilities</p>
                      <div className="flex flex-wrap gap-2.5">
                        {['Data Parsing', 'Validation', 'Logic Scoring', 'Heuristics'].slice(0, activeAgent.slug === 'risk' ? 4 : 3).map(cap => (
                          <span key={cap} className="px-3 py-1.5 rounded-lg bg-white/[0.02] text-white/50 text-[11px] font-medium border border-white/[0.03]">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 relative z-10 flex justify-end border-t border-white/[0.04] pt-8">
                  <Link href={`/agents/${activeAgent.slug}`} className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[12px] font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-all uppercase tracking-wider">
                    View Full Profile
                    <RiArrowRightLine className="text-[14px] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
