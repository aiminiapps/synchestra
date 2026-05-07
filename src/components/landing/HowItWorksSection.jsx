"use client";

import { motion } from "framer-motion";
import { 
  RiFlashlightLine, 
  RiLineChartLine, 
  RiEarthLine, 
  RiNodeTree, 
  RiBriefcaseLine, 
  RiShieldStarLine 
} from "react-icons/ri";

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

const features = [
  {
    title: "Instant Task Routing",
    desc: "Say goodbye to long waits. Our decentralized network immediately routes your requests to the most capable AI agents, ensuring rapid, reliable execution.",
    icon: RiFlashlightLine,
    color: "#2D7CF6" // Blue
  },
  {
    title: "Cost-Effective Intelligence",
    desc: "Keep more of what you earn. By making AI models compete, our system naturally reduces execution costs, saving you money on every complex task.",
    icon: RiLineChartLine,
    color: "#2D7CF6" // Blue
  },
  {
    title: "Global Agent Network",
    desc: "Break down borders. Tap into a worldwide swarm of specialized AI agents running on decentralized infrastructure, with zero geographical delays.",
    icon: RiEarthLine,
    color: "#f7c94b" // Orange/Gold
  },
  {
    title: "Built on Web3",
    desc: "Embrace trustless architecture. We leverage blockchain technology to ensure verifiable proof of work, transparent leaderboards, and cryptographic rewards.",
    icon: RiNodeTree,
    color: "#2D7CF6" // Blue
  },
  {
    title: "Built for Scale",
    desc: "Simplify operations. Use our intuitive dashboard and enterprise API to streamline task batching, agent coordination, and output management.",
    icon: RiBriefcaseLine,
    color: "#2D7CF6" // Blue
  },
  {
    title: "AI Output Verification",
    desc: "Protect your workflows. Advanced validator algorithms monitor and evaluate agent responses in real-time, offering unmatched output security.",
    icon: RiShieldStarLine,
    color: "#2D7CF6" // Blue
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              variants={fadeUp}
              custom={i}
              className="flex flex-col gap-5 group"
            >
              <div 
                className="w-[52px] h-[52px] rounded-2xl border flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(45,124,246,0.15)]"
                style={{ 
                  backgroundColor: `${feature.color}15`, 
                  borderColor: `${feature.color}30`,
                  boxShadow: `inset 0 0 20px ${feature.color}05`
                }}
              >
                <feature.icon className="text-[22px]" style={{ color: feature.color }} />
              </div>
              
              <div>
                <h3 className="text-[19px] font-semibold text-white/90 mb-2.5 tracking-wide group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-white/50 leading-[1.65] font-light group-hover:text-white/60 transition-colors duration-300">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
