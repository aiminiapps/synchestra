"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowRightLine, RiBarChartBoxLine, RiShieldKeyholeLine, RiPulseLine, RiSafe2Line } from "react-icons/ri";

export default function BottomCTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#060B18]">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main CTA Container */}
          <div className="relative rounded-[48px] bg-gradient-to-b from-[#0A101D] to-[#060B18] border border-white/[0.06] overflow-hidden flex flex-col items-center text-center p-12 sm:p-20 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
              
              {/* Massive Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#2D7CF6]/10 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#00E5A0]/10 blur-[80px] rounded-full pointer-events-none" />

              {/* Cinematic Texture Grain */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none mix-blend-overlay z-0">
                <filter id="ctaNoise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#ctaNoise)" />
              </svg>

              {/* Decorative Floating Asset Cards */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block z-10">
                 
                 {/* Top Left: Smart Contract Security */}
                 <motion.div 
                   className="absolute top-16 left-12 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3 shadow-xl"
                   animate={{ y: [0, -15, 0] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 >
                    <div className="w-10 h-10 rounded-xl bg-[#00E5A0]/10 flex items-center justify-center border border-[#00E5A0]/20">
                       <RiShieldKeyholeLine className="text-[#00E5A0] text-xl" />
                    </div>
                    <div className="text-left">
                       <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Contract Scan</p>
                       <p className="text-[12px] font-medium text-white/90">99.8% Secure</p>
                    </div>
                 </motion.div>

                 {/* Top Right: Market Velocity */}
                 <motion.div 
                   className="absolute top-24 right-16 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3 shadow-xl"
                   animate={{ y: [0, 15, 0] }}
                   transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 >
                    <div className="w-10 h-10 rounded-xl bg-[#2D7CF6]/10 flex items-center justify-center border border-[#2D7CF6]/20">
                       <RiBarChartBoxLine className="text-[#2D7CF6] text-xl" />
                    </div>
                    <div className="text-left">
                       <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Market Sentiment</p>
                       <p className="text-[12px] font-medium text-white/90">Bullish</p>
                    </div>
                 </motion.div>

                 {/* Bottom Left: Logic Nodes */}
                 <motion.div 
                   className="absolute bottom-20 left-20 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3 shadow-xl"
                   animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                   transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                 >
                    <div className="w-10 h-10 rounded-xl bg-[#f7c94b]/10 flex items-center justify-center border border-[#f7c94b]/20">
                       <RiPulseLine className="text-[#f7c94b] text-xl" />
                    </div>
                    <div className="text-left">
                       <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Node Activity</p>
                       <p className="text-[12px] font-medium text-white/90">3 Agents Active</p>
                    </div>
                 </motion.div>

                 {/* Bottom Right: Vault */}
                 <motion.div 
                   className="absolute bottom-16 right-24 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3 shadow-xl"
                   animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                   transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                 >
                    <div className="w-10 h-10 rounded-xl bg-[#4AEDC4]/10 flex items-center justify-center border border-[#4AEDC4]/20">
                       <RiSafe2Line className="text-[#4AEDC4] text-xl" />
                    </div>
                    <div className="text-left">
                       <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Tokenomics</p>
                       <p className="text-[12px] font-medium text-white/90">Verified</p>
                    </div>
                 </motion.div>
              </div>

              {/* Main Content Content */}
              <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-10 shadow-[0_0_20px_rgba(255,255,255,0.02)]"
                 >
                    <span className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_8px_#00E5A0]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/70">Synchestra Swarm Active</span>
                 </motion.div>

                 <motion.h2 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 }}
                   className="text-4xl sm:text-5xl md:text-[56px] font-medium text-white mb-8 tracking-tight leading-[1.1]"
                 >
                    Understand Your Web3 Assets <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5A0] to-[#2D7CF6]">In Unprecedented Detail.</span>
                 </motion.h2>

                 <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                   className="text-white/40 text-[16px] sm:text-[18px] leading-relaxed mb-12 max-w-2xl font-light"
                 >
                    Deploy the Synchestra AI network to instantly audit smart contracts, evaluate market sentiment, and map tokenomics across any chain. Don't just hold—comprehend.
                 </motion.p>

                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.3 }}
                   className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
                 >
                    <Link href="/arena" className="group relative w-full sm:w-auto">
                       <div className="absolute inset-0 bg-gradient-to-r from-[#00E5A0] to-[#2D7CF6] rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                       <button className="relative w-full sm:w-auto px-10 py-4.5 rounded-full bg-[#13141f] border border-white/10 text-white font-medium text-[15px] hover:bg-[#1a1b2a] transition-all duration-300 flex items-center justify-center gap-3">
                          Launch Analysis Engine
                          <RiArrowRightLine className="text-[17px] group-hover:translate-x-1 transition-transform" />
                       </button>
                    </Link>

                    <Link href="https://synchestra-ai.gitbook.io/synchestra-ai-docs" target="_blank" className="w-full sm:w-auto">
                       <button className="w-full sm:w-auto px-10 py-4.5 rounded-full bg-transparent border border-white/10 text-white/70 font-medium text-[15px] hover:text-white hover:bg-white/[0.05] transition-all duration-300">
                          Read The Docs
                       </button>
                    </Link>
                 </motion.div>
              </div>

          </div>
       </div>
    </section>
  )
}
