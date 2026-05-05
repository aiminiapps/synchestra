"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSendPlaneLine,
  RiCoinLine,
  RiQuestionLine,
  RiGlobalLine,
  RiFileTextLine,
  RiSearchLine,
  RiMicroscopeLine,
  RiLineChartLine,
  RiShieldKeyholeLine,
  RiSparklingLine,
  RiArrowRightLine
} from "react-icons/ri";
import AppShell from "@/components/layout/AppShell";
import { useAppKitAccount } from "@reown/appkit/react";
import { AGENTS, CATEGORIES, LANGUAGES, STYLES } from "@/lib/agents";
import useAnalysisStore from "@/stores/useAnalysisStore";

const AGENT_ICONS = {
  research: <RiMicroscopeLine className="w-5 h-5 text-[#00E5A0]" />,
  market: <RiLineChartLine className="w-5 h-5 text-[#2D7CF6]" />,
  risk: <RiShieldKeyholeLine className="w-5 h-5 text-[#4AEDC4]" />
};

const QUESTION_PROMPTS = [
  "What is the short-term market outlook and the key support/resistance levels?",
  "Analyze the tokenomics: are there any red flags or vesting unlocks coming up?",
  "Evaluate the long-term fundamental viability and competitive positioning.",
  "Track recent whale movements and analyze the on-chain liquidity depth."
];

const PremiumCard = ({ children, className = "" }) => (
  <div className={`rounded-[24px] border border-white/[0.04] bg-[#060B18]/60 backdrop-blur-xl shadow-2xl p-6 sm:p-10 ${className}`}>
    {children}
  </div>
);

const PremiumButton = ({ children, disabled, type = "button", className = "" }) => (
  <motion.button
    type={type}
    disabled={disabled}
    whileHover={disabled ? {} : { scale: 1.01 }}
    whileTap={disabled ? {} : { scale: 0.99 }}
    className={`w-full py-4 rounded-xl font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
      disabled 
        ? "bg-white/[0.04] text-white/30 cursor-not-allowed border border-white/[0.05]" 
        : "bg-[#00E5A0] text-[#060B18] hover:bg-[#4AEDC4] shadow-[0_0_20px_rgba(0,229,160,0.15)]"
    } ${className}`}
  >
    {children}
  </motion.button>
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ArenaPage() {
  const router = useRouter();
  const { input, setInput, resetAnalysis } = useAnalysisStore();
  const { address } = useAppKitAccount();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // CoinGecko State
  const [searchQuery, setSearchQuery] = useState(input.token || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    // Click outside to close dropdown
    const handleClickOutside = (e) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCoinGecko = useCallback((query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setIsSearching(true);
    fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
      .then(res => res.json())
      .then(data => {
        setSuggestions(data.coins?.slice(0, 5) || []);
      })
      .catch(err => {
        console.error("CoinGecko search failed:", err);
      })
      .finally(() => setIsSearching(false));
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setInput("token", val);
    setSearchQuery(val);
    setShowSuggestions(true);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchCoinGecko(val);
    }, 400);
  };

  const handleSelectToken = async (coin) => {
    setInput("token", coin.name);
    setSearchQuery(coin.name);
    setShowSuggestions(false);
    
    // Attempt to fetch contract address
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`);
      const data = await res.json();
      const platforms = data.platforms || {};
      
      const contract = Object.values(platforms).find(val => val && typeof val === 'string' && val.trim().length > 0) || '';
      setInput("contractAddress", contract);
    } catch (e) {
      console.error("Failed to fetch contract address:", e);
    }
  };

  const handlePromptClick = (prompt) => {
    setInput("question", prompt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.token.trim() || !input.question.trim()) return;

    setIsSubmitting(true);
    setError(null);
    resetAnalysis();

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, walletAddress: address || null }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data = await res.json();
      router.push(`/arena/${data.analysisId}`);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 md:py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-medium mb-5 tracking-tight text-white/90">
              Initiate <span className="font-semibold text-white">Analysis</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed">
              Deploy our decentralized network of specialized AI agents to evaluate tokens, analyze sentiment, and map risk profiles.
            </p>
          </motion.div>

          {/* Active Agents Preview */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            {AGENTS.map((agent) => (
              <div 
                key={agent.slug}
                className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] transition-colors group"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/[0.05] bg-white/[0.02] group-hover:scale-110 transition-transform duration-500 ease-out"
                >
                  {AGENT_ICONS[agent.slug]}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-white/80">{agent.name}</p>
                  <p className="text-[10px] text-white/30 font-mono tracking-wider uppercase mt-0.5">
                    {agent.type}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Input Form Wrapper */}
          <motion.div variants={fadeUp} custom={2}>
            <form onSubmit={handleSubmit}>
              <PremiumCard className="space-y-8">
                
                {/* Search Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 relative" ref={autocompleteRef}>
                  {/* Token Name with Autocomplete */}
                  <div className="relative">
                    <label className="flex items-center gap-2 text-[11px] font-semibold text-white/40 mb-3 uppercase tracking-widest">
                      <RiCoinLine className="text-sm" />
                      Target Asset *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bitcoin, Solana..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-[#00E5A0] transition-colors text-lg font-medium shadow-none rounded-none"
                      required
                    />

                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                      {showSuggestions && (suggestions.length > 0 || isSearching) && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute z-50 w-full mt-3 bg-[#060B18] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl"
                        >
                          {isSearching ? (
                            <div className="px-5 py-4 text-xs text-white/30 text-center animate-pulse">Searching global registry...</div>
                          ) : (
                            <ul>
                              {suggestions.map((coin) => (
                                <li 
                                  key={coin.id} 
                                  onClick={() => handleSelectToken(coin)}
                                  className="px-5 py-3 hover:bg-white/[0.04] cursor-pointer flex items-center gap-4 transition-colors border-b border-white/[0.02] last:border-0"
                                >
                                  <img src={coin.thumb} alt={coin.name} className="w-6 h-6 rounded-full object-cover border border-white/10" />
                                  <span className="text-white/80 text-sm font-medium">{coin.name}</span>
                                  <span className="text-white/30 text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-white/[0.03]">{coin.symbol}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Contract Address */}
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-semibold text-white/40 mb-3 uppercase tracking-widest">
                      <RiSearchLine className="text-sm" />
                      Contract Address
                    </label>
                    <input
                      type="text"
                      placeholder="Optional (0x...)"
                      value={input.contractAddress}
                      onChange={(e) => setInput("contractAddress", e.target.value)}
                      className="w-full px-0 py-3 bg-transparent border-b border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-[#00E5A0] transition-colors text-lg font-mono shadow-none rounded-none"
                    />
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent my-8" />

                {/* Question Text Area */}
                <div>
                  <label className="flex items-center gap-2 text-[11px] font-semibold text-white/40 mb-3 uppercase tracking-widest">
                    <RiQuestionLine className="text-sm" />
                    Directive *
                  </label>
                  <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.01] focus-within:border-[#00E5A0]/50 focus-within:bg-white/[0.02] transition-colors overflow-hidden">
                    <textarea
                      placeholder="Specify your analysis requirements..."
                      value={input.question}
                      onChange={(e) => setInput("question", e.target.value)}
                      rows={4}
                      className="w-full px-6 py-6 bg-transparent text-white placeholder-white/20 focus:outline-none text-base resize-none leading-relaxed"
                      required
                    />
                    <div className="px-6 py-3.5 border-t border-white/[0.04] bg-[#060B18]/50 flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] text-white/40 font-medium uppercase tracking-widest mr-2">
                        Presets:
                      </span>
                      {QUESTION_PROMPTS.map((prompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handlePromptClick(prompt)}
                          className="text-[10px] bg-white/[0.03] hover:bg-white/[0.08] text-white/60 hover:text-white/90 px-3 py-1.5 rounded-full transition-colors text-left max-w-[150px] sm:max-w-[200px] truncate border border-transparent hover:border-white/[0.05]"
                          title={prompt}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Options Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
                  {[
                    { label: "Category", icon: RiFileTextLine, key: "category", options: CATEGORIES },
                    { label: "Language", icon: RiGlobalLine, key: "language", options: LANGUAGES },
                    { label: "Format", icon: RiFileTextLine, key: "style", options: STYLES },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="flex items-center gap-2 text-[11px] font-semibold text-white/40 mb-3 uppercase tracking-widest">
                        <field.icon className="text-sm" />
                        {field.label}
                      </label>
                      <div className="relative">
                        <select
                          value={input[field.key]}
                          onChange={(e) => setInput(field.key, e.target.value)}
                          className="w-full px-0 py-3 bg-transparent border-b border-white/[0.08] text-white/80 focus:outline-none focus:border-[#00E5A0] transition-colors text-sm appearance-none cursor-pointer rounded-none"
                        >
                          {field.options.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#0b0c10] text-white/90 py-2">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Error Block */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mt-4 text-center">
                        {error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <div className="pt-8">
                  <PremiumButton
                    type="submit"
                    disabled={isSubmitting || !input.token.trim() || !input.question.trim()}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white/90 rounded-full animate-spin" />
                        <span>Initializing Agents...</span>
                      </>
                    ) : (
                      <>
                        <span>Deploy Analysis</span>
                        <RiArrowRightLine className="text-lg" />
                      </>
                    )}
                  </PremiumButton>
                </div>
                
              </PremiumCard>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </AppShell>
  );
}
