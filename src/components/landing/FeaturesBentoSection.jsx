"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  RiFundsLine, 
  RiExchangeLine, 
  RiNodeTree, 
  RiVipCrownLine,
  RiCoinsLine,
  RiSearchLine
} from "react-icons/ri";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FeaturesBentoSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <motion.div
          className="text-center mb-20 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2 
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6 text-white"
          >
            Powerful Architecture That Makes <br className="hidden sm:block" />
            <span className="text-[#00E5A0]">
              Agent Coordination Decisive
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mx-auto"
          >
            Whether you're comparing agent outputs or managing rewards, our platform equips 
            you with everything needed to coordinate AI work fast, secure, and intuitive.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Card 1: Interactive Canvas (span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 group rounded-3xl bg-gradient-to-br from-[#0A101D] to-[#060B18] border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default"
          >
            {/* Cinematic Texture Grain */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none mix-blend-overlay z-0">
              <filter id="fbsNoise1">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#fbsNoise1)" />
            </svg>
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Investigate via Interactive Canvas</h3>
              <p className="text-white/40 text-base leading-relaxed max-w-md">
                Don't just read plain text. Experience AI analyses mapped out in a dynamic node tree, linking research logic directly to conclusions for ultimate clarity.
              </p>
            </div>
            
            {/* Visual Canvas Mockup - Fixed Coordinate Grid */}
            <div className="mt-12 flex-1 w-full flex relative overflow-hidden items-center justify-center min-h-[300px]">
               {/* Subtle Dot Matrix Background */}
               <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)", backgroundSize: "20px 20px" }} />
               
               {/* Unified 600x300 Coordinate Space for Perfect Alignment */}
               <div className="relative w-[600px] h-[300px] scale-75 sm:scale-90 md:scale-100 origin-center pointer-events-none">
                 
                 {/* SVG Connecting Paths */}
                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 300">
                    {/* Center to Top-Left */}
                    <path d="M 300 150 C 210 150, 210 80, 140 80" fill="none" stroke="#00E5A0" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_10s_linear_infinite]" opacity="0.4" />
                    
                    {/* Center to Top-Right */}
                    <path d="M 300 150 C 390 150, 390 80, 460 80" fill="none" stroke="#4AEDC4" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_12s_linear_infinite_reverse]" opacity="0.4" />
                    
                    {/* Center to Bottom-Left */}
                    <path d="M 300 150 C 210 150, 210 220, 140 220" fill="none" stroke="#2D7CF6" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_8s_linear_infinite_reverse]" opacity="0.4" />
                    
                    {/* Center to Bottom-Right */}
                    <path d="M 300 150 C 390 150, 390 220, 460 220" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_10s_linear_infinite]" opacity="0.4" />
                 </svg>

                 {/* Nodes Overlay */}
                 
                 {/* Center Hub */}
                 <div className="absolute left-[300px] top-[150px] -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-gradient-to-br from-[#0c1a2e] to-[#060B18] border border-[#00E5A0]/40 shadow-[0_0_30px_#00E5A030] flex items-center justify-center animate-[float_4s_ease-in-out_infinite]">
                   <Image src="/agent.png" alt="OKAI" width={100} height={100} />
                 </div>

                 {/* Top-Left Content Card: Research */}
                 <div className="absolute left-[140px] top-[80px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_5s_ease-in-out_infinite_1s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#00E5A0] shadow-[0_0_8px_#00E5A0]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Research</span>
                    </div>
                    <div className="text-white/60 text-[9px] leading-relaxed">Cross-referencing whitepaper topology and tokenomics...</div>
                 </div>

                 {/* Top-Right Content Card: Sentiment */}
                 <div className="absolute left-[460px] top-[80px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_4.5s_ease-in-out_infinite_2s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#4AEDC4] shadow-[0_0_8px_#4AEDC4]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Sentiment</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      <span className="bg-[#4AEDC4]/10 text-[#4AEDC4] px-1.5 py-0.5 rounded text-[9px] font-medium border border-[#4AEDC4]/20">VERIFIED</span>
                      <span className="bg-white/5 text-white/50 px-1.5 py-0.5 rounded text-[9px]">98%</span>
                    </div>
                 </div>

                 {/* Bottom-Left Content Card: Market Data */}
                 <div className="absolute left-[140px] top-[220px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_5s_ease-in-out_infinite_1.5s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#2D7CF6] shadow-[0_0_8px_#2D7CF6]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Market</span>
                    </div>
                    <div className="flex justify-between items-end mt-1">
                      <span className="text-white/40 text-[9px]">24h Volume</span>
                      <span className="text-[#2D7CF6] font-mono text-[10px]">$1.2B</span>
                    </div>
                 </div>

                 {/* Bottom-Right Content Card: Risk Eval */}
                 <div className="absolute left-[460px] top-[220px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_4s_ease-in-out_infinite_0.5s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Risk Eval</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-1">
                       <div className="bg-[#ef4444] h-full w-[15%]" />
                    </div>
                    <span className="text-white/50 text-[9px]">Low Contract Risk</span>
                 </div>

               </div>
            </div>
          </motion.div>

          {/* Card 2: Multi-Chain (span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 group rounded-3xl bg-gradient-to-br from-[#0A101D] to-[#060B18] border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default"
          >
            {/* Cinematic Texture Grain */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none mix-blend-overlay z-0">
              <filter id="fbsNoise2">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#fbsNoise2)" />
            </svg>
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Seamless BNB Chain Web3</h3>
              <p className="text-white/40 text-base leading-relaxed">
                Connect instantly and securely across the BNB ecosystem. Zero friction.
              </p>
            </div>
            
            {/* Visual Wallet Mockup */}
            <div className="mt-12 flex-1 w-full relative flex justify-center items-center overflow-hidden min-h-[250px]">
              {/* Background gradient flare */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D7CF6]/10 to-transparent opacity-50" />
              
              <div className="relative w-[280px] p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl z-10 shadow-2xl transition-transform duration-700 group-hover:-translate-y-4">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-[#f3ba2f] flex justify-center items-center overflow-hidden shadow-[0_0_20px_#00E5A050]">
                         <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025" alt="BNB" className="w-6 h-6 object-contain" />
                      </div> 
                      <div>
                        <div className="text-white text-sm font-semibold">BNB Smart Chain</div>
                        <div className="text-white/40 text-xs">Connected</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#00E5A0] shadow-[0_0_10px_#00E5A0] animate-pulse" />
                 </div>
                 
                 <div className="w-full h-10 rounded-xl bg-gradient-to-r from-white/[0.05] to-white/[0.02] flex items-center px-4 mb-3 border border-white/[0.05]">
                    <div className="text-white/30 text-xs">Address: 0x4F9...e3A2</div>
                 </div>
                  <div className="h-10 w-full rounded-xl bg-gradient-to-r from-[#00E5A0] to-[#4AEDC4] text-[#060B18] font-semibold text-sm text-center flex items-center justify-center cursor-pointer shadow-[0_10px_20px_rgba(0,229,160,0.2)]">
                    Active Session
                 </div>
              </div>

              {/* Floating blur shapes to add depth */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#2D7CF6]/20 blur-3xl rounded-full mix-blend-screen" />
            </div>
          </motion.div>

          {/* Card 3: OKAI Rewards (span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 group rounded-3xl bg-gradient-to-br from-[#0A101D] to-[#060B18] border border-white/[0.05] overflow-hidden relative flex flex-col p-8 cursor-default min-h-[450px]"
          >
            {/* Cinematic Texture Grain */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none mix-blend-overlay z-0">
              <filter id="fbsNoise3">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#fbsNoise3)" />
            </svg>
            <div className="relative z-20">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Earn SYNX Rewards Automatically</h3>
              <p className="text-white/40 text-base leading-relaxed">
                Get rewarded for participation. Earn 30 SYNX for generating analyses, 20 for comparing outputs, and 10 for voting on top results.
              </p>
            </div>
            
            {/* Visual Orbital Rings */}
            <div className="absolute inset-0 top-32 flex items-center justify-center overflow-hidden pointer-events-none scale-90 sm:scale-100">
               {/* Ring 1: Outer (300px) */}
               <div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.03] animate-[spin_60s_linear_infinite]">
                  {/* SOL - Bottom Left */}
                  <div className="absolute bottom-[14.6%] left-[14.6%] -translate-x-1/2 translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#060B18] p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=025" alt="SOL" className="w-full h-full object-contain" />
                  </div>
                  {/* MATIC - Bottom Right */}
                  <div className="absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#060B18] p-1 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/polygon-matic-logo.svg?v=025" alt="MATIC" className="w-full h-full object-contain" />
                  </div>
                  {/* ARB - Top Right */}
                  <div className="absolute top-[14.6%] right-[14.6%] translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#060B18] p-1 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=025" alt="ARB" className="w-full h-full object-contain" />
                  </div>
                  {/* AVAX - Top Left */}
                  <div className="absolute top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#060B18] p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=025" alt="AVAX" className="w-full h-full object-contain" />
                  </div>
               </div>

               {/* Ring 2: Middle (210px) */}
               <div className="absolute w-[210px] h-[210px] rounded-full border border-dashed border-[#00E5A0]/30 animate-[spin_40s_linear_infinite_reverse]">
                  {/* ETH - Top */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#00E5A0]/50 bg-[#0c1a2e] p-1.5 shadow-[0_0_15px_#00E5A040] animate-[spin_40s_linear_infinite]">
                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025" alt="ETH" className="w-full h-full object-contain" />
                  </div>
                  {/* BNB - Bottom */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border border-[#f3ba2f]/50 bg-[#2a2414] p-1.5 shadow-[0_0_15px_#f3ba2f40] animate-[spin_40s_linear_infinite]">
                    <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025" alt="BNB" className="w-full h-full object-contain" />
                  </div>
               </div>

               {/* Ring 3: Inner (120px) */}
               <div className="absolute w-[120px] h-[120px] rounded-full border border-dotted border-[#2D7CF6]/40 animate-[spin_20s_ease-in-out_infinite]">
                  {/* BTC - Right */}
                   <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#2D7CF6]/50 bg-[#0c1528] p-1 shadow-[0_0_15px_#2D7CF640] animate-[spin_20s_ease-in-out_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025" alt="BTC" className="w-full h-full object-contain" />
                  </div>
               </div>
               
               {/* Center Main Core */}
               <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#060B18] to-[#0c1528] border flex items-center justify-center shadow-[0_0_30px_#00E5A030] transition-transform duration-700 group-hover:scale-110">
                  <div className="flex flex-col items-center">
                    <Image src="/agent.png" alt="OKAI" width={100} height={100} />
                  </div>
               </div>

               {/* Soft central glow */}
               <div className="absolute w-64 h-64 bg-[#00E5A0]/10 blur-3xl rounded-full" />
            </div>
          </motion.div>

          {/* Card 4: Real-Time Insights (span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-7 group rounded-3xl bg-gradient-to-br from-[#0A101D] to-[#060B18] border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default pb-0"
          >
            {/* Cinematic Texture Grain */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none mix-blend-overlay z-0">
              <filter id="fbsNoise4">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#fbsNoise4)" />
            </svg>
            <div className="p-8 pb-0 relative z-20">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Arena Flow Workspace</h3>
              <p className="text-white/40 text-base leading-relaxed max-w-lg">
                Map out multi-agent reasoning using our interactive infinite canvas. Visually trace data sources, connect logic, and build powerful AI consensus graphs effortlessly.
              </p>
            </div>
            
            {/* Card 4: Desktop OS Skeleton with Canvas Visuals */}
            <div className="relative mt-8 min-h-[300px] w-full flex items-end justify-center px-4 sm:px-8 overflow-hidden">
              {/* Desktop Window Frame */}
              <div className="w-full h-[280px] relative bg-[#060B18]/60 backdrop-blur-2xl border-t border-x border-white/[0.08] rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                 
                 {/* Mac-style Window Header */}
                 <div className="h-10 w-full border-b border-white/[0.05] bg-white/[0.02] flex items-center px-4 relative z-20">
                   <div className="flex gap-2 z-10">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 shadow-[0_0_5px_#ef444450]" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#f7c94b]/80 shadow-[0_0_5px_#f7c94b50]" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#00E5A0]/80 shadow-[0_0_5px_#00E5A050]" />
                   </div>
                 </div>

                 {/* Window Body (Canvas Grid) */}
                 <div className="absolute inset-0 top-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:24px_24px] pointer-events-none" />

                 {/* Flow Canvas Elements */}
                 <div className="absolute inset-0 top-10 pointer-events-none overflow-hidden hidden sm:block">
                   
                   {/* SVG Bezier Curves */}
                   <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 240" preserveAspectRatio="xMidYMid slice">
                     {/* Input -> Agent 1 */}
                     <path d="M 140 120 C 200 120, 220 60, 280 60" fill="none" stroke="#00E5A0" strokeWidth="2" opacity="0.4" className="animate-[dash_8s_linear_infinite]" strokeDasharray="4 6" />
                     {/* Input -> Agent 2 */}
                     <path d="M 140 120 C 200 120, 220 180, 280 180" fill="none" stroke="#2D7CF6" strokeWidth="2" opacity="0.4" className="animate-[dash_8s_linear_infinite_reverse]" strokeDasharray="4 6" />
                     {/* Agent 1 -> Consensus */}
                     <path d="M 440 60 C 500 60, 520 120, 560 120" fill="none" stroke="#00E5A0" strokeWidth="2" opacity="0.4" className="animate-[dash_8s_linear_infinite]" strokeDasharray="4 6" />
                     {/* Agent 2 -> Consensus */}
                     <path d="M 440 180 C 500 180, 520 120, 560 120" fill="none" stroke="#2D7CF6" strokeWidth="2" opacity="0.4" className="animate-[dash_8s_linear_infinite_reverse]" strokeDasharray="4 6" />
                   </svg>

                   {/* Node 1: User Request */}
                   <motion.div 
                     animate={{ y: [0, -3, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute left-[10px] top-[95px] w-[130px] bg-[#0c1a2e]/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-xl"
                   >
                     <div className="flex items-center gap-2 mb-1.5">
                       <span className="text-white/50 text-[9px] font-mono uppercase tracking-wider">Input Prompt</span>
                     </div>
                     <div className="text-white/90 text-[10px] leading-snug">"Analyze SYNX Token Potential"</div>
                     {/* Output Port */}
                     <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#0c1a2e] border-2 border-white/40 rounded-full" />
                   </motion.div>

                   {/* Node 2: Market Agent */}
                   <motion.div 
                     animate={{ y: [0, -4, 0] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                     className="absolute left-[230px] top-[30px] w-[160px] bg-[#0c1a2e]/90 backdrop-blur-xl border border-[#00E5A0]/30 rounded-xl p-3 shadow-[0_10px_30px_rgba(0,229,160,0.1)]"
                   >
                     <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#0c1a2e] border-2 border-[#00E5A0] rounded-full" />
                     <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-1.5">
                         <div className="w-4 h-4 rounded bg-[#00E5A0]/20 flex items-center justify-center">
                           <RiSearchLine className="text-[#00E5A0] text-[10px]" />
                         </div>
                         <span className="text-[#00E5A0] text-[9px] font-mono uppercase tracking-wider">Market Intel</span>
                       </div>
                       <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse" />
                     </div>
                     <div className="text-white/70 text-[9px] leading-tight line-clamp-2">Volume breaking out. Bullish divergence confirmed on 4H.</div>
                     <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#0c1a2e] border-2 border-[#00E5A0] rounded-full" />
                   </motion.div>

                   {/* Node 3: Risk Agent */}
                   <motion.div 
                     animate={{ y: [0, -5, 0] }}
                     transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     className="absolute left-[230px] top-[150px] w-[160px] bg-[#0c1a2e]/90 backdrop-blur-xl border border-[#2D7CF6]/30 rounded-xl p-3 shadow-[0_10px_30px_rgba(45,124,246,0.1)]"
                   >
                     <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#0c1a2e] border-2 border-[#2D7CF6] rounded-full" />
                     <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-1.5">
                         <div className="w-4 h-4 rounded bg-[#2D7CF6]/20 flex items-center justify-center">
                           <RiNodeTree className="text-[#2D7CF6] text-[10px]" />
                         </div>
                         <span className="text-[#2D7CF6] text-[9px] font-mono uppercase tracking-wider">Contract Risk</span>
                       </div>
                       <div className="w-1.5 h-1.5 rounded-full bg-[#2D7CF6] animate-pulse" />
                     </div>
                     <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-1">
                       <div className="bg-[#2D7CF6] h-full w-[85%]" />
                     </div>
                     <div className="text-white/40 text-[8px]">Security Score: 85/100</div>
                     <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#0c1a2e] border-2 border-[#2D7CF6] rounded-full" />
                   </motion.div>

                   {/* Node 4: Consensus Output */}
                   <motion.div 
                     animate={{ y: [0, -3, 0], scale: [1, 1.02, 1] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                     className="absolute left-[460px] top-[95px] w-[120px] bg-gradient-to-br from-[#10192e]/90 to-[#060B18]/90 backdrop-blur-xl border border-[#f7c94b]/40 rounded-xl p-3 shadow-[0_15px_40px_rgba(247,201,75,0.15)]"
                   >
                     <div className="flex items-center gap-1.5 mb-1.5">
                       <div className="w-4 h-4 rounded-full bg-[#f7c94b]/20 flex items-center justify-center border border-[#f7c94b]/30">
                         <RiVipCrownLine className="text-[#f7c94b] text-[10px]" />
                       </div>
                       <span className="text-[#f7c94b] text-[9px] font-mono uppercase tracking-wider">Consensus</span>
                     </div>
                     <div className="text-white text-[13px] font-bold tracking-tight">STRONG BUY</div>
                   </motion.div>
                 </div>

                 {/* Mobile fallback text so it doesn't break */}
                 <div className="absolute inset-0 sm:hidden flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                    <RiNodeTree className="text-4xl text-[#00E5A0] mb-3 opacity-50" />
                    <p className="text-white/40 text-xs">Canvas visualization optimized for desktop displays.</p>
                 </div>

                 {/* Base Fade for depth */}
                 <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060B18] to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
