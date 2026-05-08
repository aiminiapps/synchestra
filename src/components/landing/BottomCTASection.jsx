"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowRightLine, RiBarChartBoxLine, RiShieldKeyholeLine, RiPulseLine, RiSafe2Line } from "react-icons/ri";

export default function BottomCTASection() {
  return (
    <section className="py-16 relative overflow-hidden">
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
              {/* Main Content Content */}
              <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
                 <motion.h2 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 }}
                   className="text-4xl sm:text-5xl md:text-[56px] font-medium text-white mb-8 tracking-tight leading-[1.1]"
                 >
                    Understand Your Web3 Assets <br className="hidden sm:block" />
                    <span className="text-[#00E5A0]">In Unprecedented Detail.</span>
                 </motion.h2>

                 <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                   className="text-white/40 text-[16px] sm:text-[18px] leading-relaxed mb-12 max-w-2xl font-light"
                 >
                    Deploy the Synchestra AI network to instantly audit smart contracts, evaluate market sentiment, and map tokenomics across any chain. Don't just hold comprehend.
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

                    <Link href="https://aisynx.gitbook.io/aisynx-docs" target="_blank" className="w-full sm:w-auto">
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
