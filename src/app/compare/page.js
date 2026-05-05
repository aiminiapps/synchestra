"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppKitAccount } from "@reown/appkit/react";
import {
  RiArrowLeftRightLine,
  RiCoinLine,
  RiBarChartBoxLine,
  RiPieChartLine,
  RiExchangeDollarLine,
  RiTrophyLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiSparklingLine,
  RiRobot2Line,
  RiCloseLine,
} from "react-icons/ri";
import AppShell from "@/components/layout/AppShell";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";

/* ─── Coin Search Hook ─── */
function useCoinSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [show, setShow] = useState(false);
  const timer = useRef(null);

  const search = useCallback((q) => {
    setQuery(q);
    setShow(true);
    if (timer.current) clearTimeout(timer.current);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    timer.current = setTimeout(() => {
      setSearching(true);
      fetch(`https://api.coingecko.com/api/v3/search?query=${q}`)
        .then((r) => r.json())
        .then((d) => setResults(d.coins?.slice(0, 5) || []))
        .catch(() => {})
        .finally(() => setSearching(false));
    }, 400);
  }, []);

  return { query, search, results, searching, show, setShow };
}

/* ─── Coin Search Input ─── */
function CoinSearchInput({ label, side, onSelect, selectedCoin }) {
  const { query, search, results, searching, show, setShow } = useCoinSearch();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShow(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setShow]);

  const sideColor = side === "a" ? "#00E5A0" : "#2D7CF6";

  return (
    <div ref={ref} className="relative">
      <label
        className="text-[10px] uppercase tracking-widest font-semibold mb-3 block"
        style={{ color: `${sideColor}90` }}
      >
        {label}
      </label>
      {selectedCoin ? (
        <div
          className="flex items-center gap-4 p-4 rounded-[20px] border bg-[#060B18]/60 backdrop-blur-xl shadow-xl"
          style={{ borderColor: `${sideColor}30` }}
        >
          {selectedCoin.image && (
            <img src={selectedCoin.image} alt="" className="w-8 h-8 rounded-full border border-white/10" />
          )}
          <div className="flex-1">
            <p className="text-[15px] font-medium text-white/90">{selectedCoin.name}</p>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-0.5">
              {selectedCoin.symbol}
              {selectedCoin.rank ? ` · Rank ${selectedCoin.rank}` : ""}
            </p>
          </div>
          <button
            onClick={() => onSelect(null)}
            className="w-8 h-8 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.05] cursor-pointer transition-colors"
          >
            <RiCloseLine className="text-base" />
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search token..."
            value={query}
            onChange={(e) => search(e.target.value)}
            className="w-full px-4 py-4 rounded-[20px] bg-white/[0.02] border border-white/[0.04] text-white placeholder-white/30 focus:outline-none focus:border-white/[0.1] text-[13px] font-light transition-all shadow-inner"
            onFocus={() => setShow(true)}
          />
          <AnimatePresence>
            {show && (results.length > 0 || searching) && (
              <motion.ul
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute z-50 w-full mt-2 bg-[#060B18]/95 backdrop-blur-2xl border border-white/[0.06] rounded-[20px] overflow-hidden py-2 shadow-2xl"
              >
                {searching ? (
                  <li className="px-4 py-3 text-xs text-white/30 text-center animate-pulse">
                    Searching...
                  </li>
                ) : (
                  results.map((coin) => (
                    <li
                      key={coin.id}
                      onClick={async () => {
                        setShow(false);
                        try {
                          const res = await fetch(
                            `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
                          );
                          const data = await res.json();
                          const md = data.market_data;
                          onSelect({
                            id: coin.id,
                            name: data.name,
                            symbol: data.symbol?.toUpperCase(),
                            image: data.image?.small,
                            price: md?.current_price?.usd,
                            change24h: md?.price_change_percentage_24h,
                            change7d: md?.price_change_percentage_7d,
                            change30d: md?.price_change_percentage_30d,
                            marketCap: md?.market_cap?.usd,
                            volume: md?.total_volume?.usd,
                            rank: data.market_cap_rank,
                            ath: md?.ath?.usd,
                            athChange: md?.ath_change_percentage?.usd,
                            circulatingSupply: md?.circulating_supply,
                            totalSupply: md?.total_supply,
                            maxSupply: md?.max_supply,
                          });
                        } catch {
                          onSelect({
                            id: coin.id,
                            name: coin.name,
                            symbol: coin.symbol?.toUpperCase(),
                            image: coin.thumb,
                          });
                        }
                      }}
                      className="px-4 py-2.5 hover:bg-white/[0.04] cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      <img src={coin.thumb} alt="" className="w-5 h-5 rounded-full" />
                      <span className="text-sm text-white/80">{coin.name}</span>
                      <span className="text-[10px] font-mono text-white/30 uppercase">
                        {coin.symbol}
                      </span>
                    </li>
                  ))
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

/* ─── Comparison Metric Row ─── */
function CompareMetric({ label, valueA, valueB, format = "default", icon: Icon }) {
  const fmt = (v) => {
    if (v == null) return "—";
    if (format === "currency")
      return v >= 1e9
        ? `$${(v / 1e9).toFixed(2)}B`
        : v >= 1e6
          ? `$${(v / 1e6).toFixed(2)}M`
          : `$${v.toLocaleString()}`;
    if (format === "percent") return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
    if (format === "supply")
      return v >= 1e9
        ? `${(v / 1e9).toFixed(2)}B`
        : v >= 1e6
          ? `${(v / 1e6).toFixed(2)}M`
          : v?.toLocaleString?.() ?? "—";
    if (format === "price")
      return `$${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
    return v?.toString?.() ?? "—";
  };

  const colorA =
    format === "percent" && valueA != null
      ? valueA >= 0 ? "text-[#2dd4a0]" : "text-[#ff6b5b]"
      : "";
  const colorB =
    format === "percent" && valueB != null
      ? valueB >= 0 ? "text-[#2dd4a0]" : "text-[#ff6b5b]"
      : "";

  // Winner highlight logic
  const numA = typeof valueA === "number" ? valueA : null;
  const numB = typeof valueB === "number" ? valueB : null;
  const winA = numA != null && numB != null ? numA > numB : false;
  const winB = numA != null && numB != null ? numB > numA : false;

  return (
    <div className="flex items-center gap-3 py-3.5 border-b border-white/[0.04] last:border-0">
      <div className="flex-1 text-right">
        <p className={`text-[13px] font-mono ${colorA} ${winA ? "font-bold" : "text-white/60 font-medium"}`}>
          {fmt(valueA)}
        </p>
      </div>
      <div className="w-28 sm:w-36 text-center shrink-0">
        <div className="flex items-center justify-center gap-1.5 text-[9px] text-white/40 uppercase tracking-[0.15em] font-semibold">
          {Icon && <Icon className="text-sm text-white/30" />}
          {label}
        </div>
      </div>
      <div className="flex-1 text-left">
        <p className={`text-[13px] font-mono ${colorB} ${winB ? "font-bold" : "text-white/60 font-medium"}`}>
          {fmt(valueB)}
        </p>
      </div>
    </div>
  );
}

/* ─── Score Bar (visual winner indicator) ─── */
function ScoreBar({ coinA, coinB }) {
  // Count wins per metric
  const metrics = [
    { a: coinA?.price, b: coinB?.price },
    { a: coinA?.change24h, b: coinB?.change24h },
    { a: coinA?.change7d, b: coinB?.change7d },
    { a: coinA?.change30d, b: coinB?.change30d },
    { a: coinA?.marketCap, b: coinB?.marketCap },
    { a: coinA?.volume, b: coinB?.volume },
  ];

  let winsA = 0, winsB = 0;
  metrics.forEach(({ a, b }) => {
    if (a != null && b != null) {
      if (a > b) winsA++;
      else if (b > a) winsB++;
    }
  });

  const total = winsA + winsB || 1;
  const pctA = Math.round((winsA / total) * 100);
  const pctB = 100 - pctA;

  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center gap-2.5 text-xs font-mono">
        {coinA.image && <img src={coinA.image} alt="" className="w-5 h-5 rounded-full border border-[#00E5A0]/30" />}
        <span className="text-[#00E5A0] font-bold text-sm">{winsA}</span>
      </div>
      <div className="flex-1 h-2.5 bg-white/[0.02] border border-white/[0.04] rounded-full overflow-hidden flex">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctA}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#00E5A0]/80 to-[#00E5A0] rounded-l-full shadow-[0_0_10px_rgba(0,229,160,0.5)]"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctB}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="h-full bg-gradient-to-l from-[#2D7CF6]/80 to-[#2D7CF6] rounded-r-full shadow-[0_0_10px_rgba(45,124,246,0.5)]"
        />
      </div>
      <div className="flex items-center gap-2.5 text-xs font-mono">
        <span className="text-[#2D7CF6] font-bold text-sm">{winsB}</span>
        {coinB.image && <img src={coinB.image} alt="" className="w-5 h-5 rounded-full border border-[#2D7CF6]/30" />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function ComparePage() {
  const { address } = useAppKitAccount();
  const [coinA, setCoinA] = useState(null);
  const [coinB, setCoinB] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [reward, setReward] = useState(null);

  const bothSelected = coinA && coinB;

  // Fetch AI comparison when both coins selected
  const runAICompare = async () => {
    if (!coinA || !coinB) return;
    setAiLoading(true);
    setAiAnalysis(null);
    setReward(null);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coinA,
          coinB,
          walletAddress: address || null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiAnalysis(data.analysis);
        if (data.reward) setReward(data.reward);
      }
    } catch (err) {
      console.error("AI compare failed:", err);
    } finally {
      setAiLoading(false);
    }
  };

  // Auto-run AI when both coins selected
  useEffect(() => {
    if (bothSelected) {
      runAICompare();
    } else {
      setAiAnalysis(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinA?.id, coinB?.id]);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-medium mb-3 tracking-tight text-white/90">
            Compare <span className="font-semibold text-[#00E5A0]">Tokens</span>
          </h1>
          <p className="text-white/40 text-[15px] font-light max-w-lg mx-auto">
            Side-by-side market data and AI-powered investment comparison
          </p>
        </motion.div>

        {/* Coin selectors */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
        >
          <CoinSearchInput label="Token A" side="a" onSelect={setCoinA} selectedCoin={coinA} />
          <CoinSearchInput label="Token B" side="b" onSelect={setCoinB} selectedCoin={coinB} />
        </motion.div>

        <AnimatePresence>
          {bothSelected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-6"
            >
              {/* Score Bar */}
              <ScoreBar coinA={coinA} coinB={coinB} />

              {/* Comparison Table */}
              <div className="rounded-[24px] bg-[#060B18]/60 backdrop-blur-xl border border-white/[0.04] shadow-2xl overflow-hidden">
                {/* Header row */}
                <div className="flex items-center gap-3 p-5 sm:p-6 border-b border-white/[0.04] bg-white/[0.01]">
                  <div className="flex-1 flex items-center gap-3 justify-end">
                    {coinA.image && (
                      <img src={coinA.image} alt="" className="w-8 h-8 rounded-full border border-white/10" />
                    )}
                    <span className="text-base font-medium text-white/90 tracking-wide">{coinA.symbol}</span>
                  </div>
                  <div className="w-28 sm:w-36 text-center shrink-0">
                    <RiArrowLeftRightLine className="text-white/20 mx-auto text-xl" />
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    {coinB.image && (
                      <img src={coinB.image} alt="" className="w-8 h-8 rounded-full border border-white/10" />
                    )}
                    <span className="text-base font-medium text-white/90 tracking-wide">{coinB.symbol}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="px-4 sm:px-5 py-2">
                  <CompareMetric label="Rank" valueA={coinA.rank ? `#${coinA.rank}` : null} valueB={coinB.rank ? `#${coinB.rank}` : null} icon={RiTrophyLine} />
                  <CompareMetric label="Price" valueA={coinA.price} valueB={coinB.price} format="price" icon={RiCoinLine} />
                  <CompareMetric label="24h" valueA={coinA.change24h} valueB={coinB.change24h} format="percent" icon={RiExchangeDollarLine} />
                  <CompareMetric label="7d" valueA={coinA.change7d} valueB={coinB.change7d} format="percent" />
                  <CompareMetric label="30d" valueA={coinA.change30d} valueB={coinB.change30d} format="percent" />
                  <CompareMetric label="Market Cap" valueA={coinA.marketCap} valueB={coinB.marketCap} format="currency" icon={RiPieChartLine} />
                  <CompareMetric label="24h Volume" valueA={coinA.volume} valueB={coinB.volume} format="currency" icon={RiBarChartBoxLine} />
                  <CompareMetric label="ATH" valueA={coinA.ath} valueB={coinB.ath} format="price" icon={RiTrophyLine} />
                  <CompareMetric label="From ATH" valueA={coinA.athChange} valueB={coinB.athChange} format="percent" />
                  <CompareMetric label="Circulating" valueA={coinA.circulatingSupply} valueB={coinB.circulatingSupply} format="supply" />
                  <CompareMetric label="Max Supply" valueA={coinA.maxSupply} valueB={coinB.maxSupply} format="supply" />
                </div>
              </div>

              {/* AI Analysis Panel */}
              <div className="rounded-[24px] bg-[#060B18]/60 backdrop-blur-xl border border-white/[0.04] shadow-2xl overflow-hidden">
                <div className="flex items-center gap-4 px-6 py-5 border-b border-white/[0.04] bg-white/[0.01]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5A0]/15 to-[#2D7CF6]/10 border border-[#00E5A0]/20 flex items-center justify-center">
                    <RiRobot2Line className="text-base text-[#00E5A0]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-white/90">AI Comparison Analysis</h3>
                    <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mt-0.5">
                      {coinA.symbol} vs {coinB.symbol}
                    </p>
                  </div>
                  {reward && (
                    <span className="text-[10px] font-bold font-mono text-[#00E5A0] bg-[#00E5A0]/10 px-3 py-1.5 rounded-full border border-[#00E5A0]/20 shadow-[0_0_15px_rgba(0,229,160,0.1)] tracking-widest">
                      +{reward.earned} SYNX
                    </span>
                  )}
                </div>

                <div className="p-5">
                  {aiLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-5">
                      <div className="relative">
                        <div className="w-12 h-12 border-2 border-white/10 border-t-[#00E5A0] rounded-full animate-spin" />
                        <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-b-[#2D7CF6] rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                      </div>
                      <p className="text-[11px] text-white/30 font-mono uppercase tracking-[0.2em]">
                        Analyzing {coinA.symbol} vs {coinB.symbol}...
                      </p>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                      <MarkdownRenderer content={aiAnalysis} />
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <RiSparklingLine className="text-2xl text-white/10 mx-auto mb-3" />
                      <p className="text-sm text-white/25">
                        AI analysis will appear here
                      </p>
                    </div>
                  )}
                </div>

                {/* Retry button */}
                {aiAnalysis && !aiLoading && (
                  <div className="px-6 pb-6 pt-2">
                    <button
                      onClick={runAICompare}
                      className="w-full py-3 rounded-xl bg-[#00E5A0] text-[#060B18] text-[11px] font-bold hover:bg-[#4AEDC4] transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-widest shadow-[0_0_20px_rgba(0,229,160,0.15)]"
                    >
                      <RiSparklingLine className="text-sm" />
                      Re-analyze
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!bothSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <RiArrowLeftRightLine className="text-3xl text-white/10 mx-auto mb-3" />
            <p className="text-sm text-white/20">
              Select two tokens above to compare
            </p>
          </motion.div>
        )}
      </div>

      {/* Custom scrollbar style */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
      `}</style>
    </AppShell>
  );
}
