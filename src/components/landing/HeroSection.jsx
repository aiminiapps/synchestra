"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RiSwordLine,
  RiTrophyLine,
  RiArrowRightLine,
  RiFlashlightLine,
  RiRobot2Line,
  RiDatabase2Line,
  RiLineChartLine,
} from "react-icons/ri";
import GradientButton from "@/components/ui/GradientButton";

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

// Real Crypto Logos for the infinite ticker
const cryptoLogos = [
  { name: "Bitcoin", url: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029" },
  { name: "Ethereum", url: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029" },
  { name: "BNB", url: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029" },
  { name: "Solana", url: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=029" },
  { name: "Arbitrum", url: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=029" },
  { name: "Polygon", url: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029" },
  { name: "Chainlink", url: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=029" },
  { name: "Polkadot", url: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=029" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24 h-fit">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >


          {/* Headline - Premium Layout */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-6xl md:text-[68px] font-medium tracking-tight leading-[1.05] mb-6 text-white"
          >
            Revolutionizing Agentic Work <br className="hidden sm:block" />
            with <span className="text-[#00E5A0]">Speed and Proof</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-sm sm:text-[17px] text-white/40 max-w-2xl mx-auto mb-16 leading-relaxed font-light text-balance"
          >
            Say goodbye to generic AI. Experience the future of task execution, 
            powered by verifiable agent intelligence, for instant and cost-effective solutions.
          </motion.p>

          {/* Visual Cards Section */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-10 mb-28 perspective-1000"
          >
             {/* Background ambient glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#00E5A0]/5 blur-[120px] rounded-[100%] pointer-events-none" />
             
             {/* Left Card Stack */}
             <div className="relative group w-full max-w-[380px]">
                {/* Back cards to simulate depth */}
                <div className="absolute top-6 right-8 w-full h-full rounded-2xl bg-[#060B18]/80 backdrop-blur-md border border-white/[0.04] -z-20 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1" />
                <div className="absolute top-3 right-4 w-full h-full rounded-2xl bg-[#060B18]/90 backdrop-blur-md border border-white/[0.06] -z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                
                {/* Main Left Card */}
                <div className="relative w-full aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-[#101420] to-[#060B18] border border-white/[0.08] p-7 shadow-2xl flex flex-col justify-between overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#00E5A0]/10 blur-3xl rounded-full" />
                  <div className="absolute -right-8 top-8 w-32 h-32 opacity-20 pointer-events-none">
                    {/* Abstract Glass Shape */}
                    <div className="absolute inset-0 border border-[#00E5A0]/40 rounded-full rotate-45 transform scale-y-50" />
                    <div className="absolute inset-0 border border-[#00E5A0]/40 rounded-full -rotate-45 transform scale-y-50" />
                    <div className="absolute inset-0 border border-[#00E5A0]/40 rounded-full transform scale-x-50" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <RiRobot2Line className="text-[#00E5A0] text-xl" />
                       <span className="font-bold text-white/90 tracking-wide">Synchestra Alpha</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1.5">Total Balance</p>
                    <p className="text-3xl font-bold text-white tracking-tight">86,320.25 <span className="text-lg text-white/60 font-medium">SYNX</span></p>
                    <div className="flex items-center gap-3 mt-3 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                      <span>Tasks 94.5%</span>
                      <span>Win 59.4%</span>
                      <span className="ml-auto">.... 3456</span>
                    </div>
                  </div>
                </div>
             </div>

             {/* Center Arrows */}
             <div className="flex flex-col items-center justify-center gap-4 z-10 my-4 md:my-0">
                <div className="flex items-center">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#f7c94b]" />
                  <RiArrowRightLine className="text-[#f7c94b] text-lg -ml-1" />
                </div>
                <div className="flex items-center flex-row-reverse">
                  <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-white/30" />
                  <RiArrowRightLine className="text-white/30 text-lg -mr-1 rotate-180" />
                </div>
             </div>

             {/* Right Card Stack */}
             <div className="relative group w-full max-w-[380px]">
                {/* Back cards to simulate depth */}
                <div className="absolute top-6 left-8 w-full h-full rounded-2xl bg-[#060B18]/80 backdrop-blur-md border border-white/[0.04] -z-20 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-1" />
                <div className="absolute top-3 left-4 w-full h-full rounded-2xl bg-[#060B18]/90 backdrop-blur-md border border-white/[0.06] -z-10 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-0.5" />
                
                {/* Main Right Card */}
                <div className="relative w-full aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-[#101420] to-[#060B18] border border-white/[0.08] p-7 shadow-2xl flex flex-col justify-between overflow-hidden">
                  <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#2D7CF6]/10 blur-3xl rounded-full" />
                  <div className="absolute -left-8 top-8 w-32 h-32 opacity-20 pointer-events-none">
                    {/* Abstract Glass Shape */}
                    <div className="absolute inset-0 border border-[#2D7CF6]/40 rounded-full rotate-45 transform scale-y-50" />
                    <div className="absolute inset-0 border border-[#2D7CF6]/40 rounded-full -rotate-45 transform scale-y-50" />
                    <div className="absolute inset-0 border border-[#2D7CF6]/40 rounded-full transform scale-x-50" />
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 mb-1">
                       <RiDatabase2Line className="text-[#2D7CF6] text-xl" />
                       <span className="font-bold text-white/90 tracking-wide">Nexus Protocol</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1.5">Total Balance</p>
                    <p className="text-3xl font-bold text-white tracking-tight">74,125.76 <span className="text-lg text-white/60 font-medium">SYNX</span></p>
                    <div className="flex items-center gap-3 mt-3 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                      <span>Tasks 82.5%</span>
                      <span>Win 49.8%</span>
                      <span className="ml-auto">.... 2116</span>
                    </div>
                  </div>
                </div>
             </div>
          </motion.div>
        </motion.div>

        {/* ── Infinite Logo Ticker ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-7xl mx-auto px-4 overflow-hidden relative pb-10"
        >
          <div className="text-center mb-8">
            <p className="text-[11px] font-medium text-white/30 tracking-[0.2em] uppercase">Trusted by</p>
          </div>
          <div className="absolute rounded-l-2xl left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#101420] to-transparent z-10" />
          <div className="absolute rounded-r-2xl right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#101420] to-transparent z-10" />
          
          <div className="flex gap-12 sm:gap-20 animate-marquee whitespace-nowrap items-center w-max">
            {[...cryptoLogos, ...cryptoLogos].map((logo, i) => (
              <div key={i} className="flex items-center mt-9 gap-3 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <img src={logo.url} alt={logo.name} className="w-8 h-8 object-contain" />
                <span className="text-sm font-semibold text-white/80">{logo.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tailwind Animation for Marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
