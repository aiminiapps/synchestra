"use client";

import { useEffect, useState, use, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCheckboxCircleLine,
  RiTimeLine,
  RiArrowLeftLine,
  RiTrophyLine,
  RiSparklingLine,
  RiMicroscopeLine,
  RiLineChartLine,
  RiShieldKeyholeLine,
  RiShareLine,
  RiCoinLine,
  RiBarChartBoxLine,
  RiPieChartLine,
  RiExchangeDollarLine,
  RiLayoutGridLine,
  RiRoadMapLine,
  RiCloseLine,
  RiArrowUpLine,
  RiArrowDownLine,
} from "react-icons/ri";
import Link from "next/link";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAppKitAccount } from "@reown/appkit/react";
import { AGENT_MAP } from "@/lib/agents";

import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const AGENT_ICONS = {
  research: <RiMicroscopeLine className="w-[18px] h-[18px]" />,
  market: <RiLineChartLine className="w-[18px] h-[18px]" />,
  risk: <RiShieldKeyholeLine className="w-[18px] h-[18px]" />,
};

/* ═══════════════════════════════════════════════════════════════════════════
   MARKET DATA FETCHER HOOK
   ═══════════════════════════════════════════════════════════════════════════ */
function useMarketData(token) {
  const [market, setMarket] = useState(null);

  useEffect(() => {
    async function fetchMarket() {
      try {
        const searchRes = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(token)}`
        );
        const searchData = await searchRes.json();
        const coin = searchData.coins?.[0];
        if (!coin) return;

        const detailRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
        );
        const detail = await detailRes.json();
        const md = detail.market_data;
        if (md) {
          setMarket({
            name: detail.name,
            symbol: detail.symbol?.toUpperCase(),
            image: detail.image?.small,
            price: md.current_price?.usd,
            change24h: md.price_change_percentage_24h,
            change7d: md.price_change_percentage_7d,
            change30d: md.price_change_percentage_30d,
            marketCap: md.market_cap?.usd,
            volume: md.total_volume?.usd,
            rank: detail.market_cap_rank,
            ath: md.ath?.usd,
            athChange: md.ath_change_percentage?.usd,
            circulatingSupply: md.circulating_supply,
            totalSupply: md.total_supply,
            maxSupply: md.max_supply,
          });
        }
      } catch {
        /* silent */
      }
    }
    fetchMarket();
  }, [token]);

  return market;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CANVAS CUSTOM NODE COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

const fmt = (n) =>
  n != null
    ? n >= 1e9
      ? `$${(n / 1e9).toFixed(2)}B`
      : n >= 1e6
        ? `$${(n / 1e6).toFixed(2)}M`
        : `$${n.toLocaleString()}`
    : "—";
const fmtSupply = (n) =>
  n != null
    ? n >= 1e9
      ? `${(n / 1e9).toFixed(2)}B`
      : n >= 1e6
        ? `${(n / 1e6).toFixed(2)}M`
        : n.toLocaleString()
    : "—";

/* ─── Hub Node (Central Request) ─── */
const HubNode = ({ data }) => {
  const { analysis, market } = data;
  return (
    <>
      <div className="w-[460px] rounded-[24px] relative overflow-hidden border border-white/[0.04] bg-[#060B18]/60 backdrop-blur-xl shadow-2xl p-8">
        {/* Token + Price Row */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {market?.image && (
              <img src={market.image} alt="" className="w-12 h-12 rounded-full border border-white/10" />
            )}
            <div>
              <h2 className="text-3xl font-medium text-white/90 tracking-tight">
                {analysis.token}
              </h2>
              {market?.symbol && (
                <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest block mt-1">
                  {market.symbol}
                  {market.rank ? ` · Rank ${market.rank}` : ""}
                </span>
              )}
            </div>
          </div>
          {market?.price != null && (
            <div className="text-right">
              <p className="text-xl font-medium font-mono text-white/90">
                ${market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </p>
              {market.change24h != null && (
                <p
                  className={`text-[11px] font-mono flex items-center gap-1 justify-end mt-1 ${market.change24h >= 0 ? "text-[#00E5A0]" : "text-red-400"}`}
                >
                  {market.change24h >= 0 ? (
                    <RiArrowUpLine />
                  ) : (
                    <RiArrowDownLine />
                  )}
                  {Math.abs(market.change24h).toFixed(2)}% 24h
                </p>
              )}
            </div>
          )}
        </div>

        {/* Question */}
        <div className="text-white/60 text-[14px] leading-relaxed bg-white/[0.02] p-5 rounded-2xl border border-white/[0.04] mb-6 nodrag nowheel font-light">
          {analysis.question}
        </div>

        {/* Market mini-stats */}
        {market && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
              <span className="text-[9px] text-white/30 uppercase tracking-[0.15em] block mb-1.5">
                Market Cap
              </span>
              <span className="text-[13px] font-mono font-medium text-white/80">
                {fmt(market.marketCap)}
              </span>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
              <span className="text-[9px] text-white/30 uppercase tracking-[0.15em] block mb-1.5">
                24h Vol
              </span>
              <span className="text-[13px] font-mono font-medium text-white/80">
                {fmt(market.volume)}
              </span>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
              <span className="text-[9px] text-white/30 uppercase tracking-[0.15em] block mb-1.5">
                7d Change
              </span>
              <span
                className={`text-[13px] font-mono font-medium ${market.change7d != null ? (market.change7d >= 0 ? "text-[#00E5A0]" : "text-red-400") : "text-white/40"}`}
              >
                {market.change7d != null
                  ? `${market.change7d >= 0 ? "+" : ""}${market.change7d.toFixed(2)}%`
                  : "—"}
              </span>
            </div>
          </div>
        )}

        {/* Meta tags */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[9px] font-semibold tracking-widest uppercase text-[#00E5A0] px-3 py-1.5 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20">
            {analysis.category}
          </span>
          <span className="text-[9px] font-semibold tracking-widest uppercase text-white/40 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05]">
            {analysis.language}
          </span>
          <span className="text-[9px] font-semibold tracking-widest uppercase text-white/40 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05]">
            {analysis.style || "Detailed Report"}
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!opacity-0 !w-0" />
    </>
  );
};

/* ─── Agent Node ─── */
const AgentNode = ({ data }) => {
  const {
    agentSlug,
    responseMs,
    isWinnerNode,
    voted,
    isLoser,
    onVote,
    voting,
    onOpenDetail,
    wordCount,
  } = data;
  const agent = AGENT_MAP[agentSlug];

  return (
    <>
      <Handle type="target" position={Position.Left} className="!opacity-0 !w-0" />
      <div
        className={`w-[400px] transition-all duration-700 ${isWinnerNode ? "scale-[1.02]" : isLoser ? "opacity-30 grayscale-[50%]" : ""}`}
      >
        <div
          className={`w-full rounded-[24px] relative overflow-hidden transition-all duration-500 bg-[#060B18]/60 backdrop-blur-xl ${isWinnerNode ? "border-[#00E5A0]/40 shadow-[0_0_30px_rgba(0,229,160,0.1)]" : "border-white/[0.04] shadow-2xl"}`}
          style={{ borderWidth: "1px", borderStyle: "solid" }}
        >
          {/* Winner top glow */}
          {isWinnerNode && (
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E5A0] to-transparent" />
          )}

          <div className="p-6">
            {/* Agent identity */}
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.05]"
              >
                {AGENT_ICONS[agentSlug]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[16px] text-white/90">{agent.name}</h3>
                <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mt-1">
                  {agent.type}
                </p>
              </div>
              {isWinnerNode && voted && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20">
                  <RiTrophyLine className="text-[#00E5A0] text-[10px]" />
                  <span className="text-[9px] font-bold text-[#00E5A0] uppercase tracking-widest">
                    Winner
                  </span>
                </div>
              )}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 mb-6">
              {responseMs > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/40">
                  <RiTimeLine className="text-sm" />
                  {(responseMs / 1000).toFixed(1)}s
                </div>
              )}
              {wordCount > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/40">
                  <RiBarChartBoxLine className="text-sm" />
                  {wordCount} words
                </div>
              )}
            </div>

            {/* Read Full Analysis button */}
            <button
              onClick={() => onOpenDetail(agentSlug)}
              className="w-full py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 mb-3 bg-white/[0.02] border border-white/[0.05] text-white/60 hover:text-white/90 hover:bg-white/[0.04]"
            >
              <RiSparklingLine />
              View Full Report
            </button>

            {/* Vote / Status */}
            {!voted ? (
              <button
                onClick={onVote}
                disabled={voting}
                className={`w-full py-3.5 rounded-xl font-semibold text-[12px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  voting 
                    ? "bg-white/[0.04] text-white/30 cursor-not-allowed border border-white/[0.05]" 
                    : "bg-[#00E5A0] text-[#060B18] hover:bg-[#4AEDC4] shadow-[0_0_20px_rgba(0,229,160,0.15)]"
                }`}
              >
                {voting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white/90 rounded-full animate-spin" />
                    Locking...
                  </>
                ) : (
                  <>
                    <RiCheckboxCircleLine className="text-base" />
                    Select as Best
                  </>
                )}
              </button>
            ) : isWinnerNode ? (
              <div className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] text-[11px] font-bold tracking-[0.15em] uppercase">
                <RiTrophyLine className="text-base" />
                Winning Protocol
              </div>
            ) : (
              <div className="py-3.5 rounded-xl bg-white/[0.02] text-white/20 text-[11px] font-medium tracking-widest w-full text-center border border-white/[0.03] uppercase">
                Dormant
              </div>
            )}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!opacity-0 !w-0" />
    </>
  );
};

/* ─── Section Node (analysis content chunks) ─── */
const SectionNode = ({ data }) => (
  <>
    <Handle type="target" position={Position.Left} className="!opacity-0 !w-0" />
    <div
      className={`w-[520px] h-[220px] rounded-[24px] overflow-hidden transition-all duration-500 bg-[#060B18]/60 backdrop-blur-xl shadow-2xl ${data.isWinnerNode ? "border-[#00E5A0]/30 scale-[1.01]" : "border-white/[0.04]"}`}
      style={{ borderWidth: "1px", borderStyle: "solid" }}
    >
      <div className="w-full h-full p-6 sm:p-8 flex flex-col relative">
        <h4 className="text-[11px] font-bold text-[#00E5A0] mb-4 pb-3 border-b border-white/[0.06] tracking-widest uppercase flex items-center gap-2 shrink-0">
          <RiSparklingLine className="text-base" />
          {data.title}
        </h4>
        <div className="premium-markdown flex-1 text-[13px] leading-[1.8] text-white/60 overflow-y-auto custom-scrollbar pr-3 nodrag nowheel font-light">
          <MarkdownRenderer content={data.content} />
        </div>
      </div>
    </div>
    <Handle type="source" position={Position.Right} className="!opacity-0 !w-0" />
  </>
);

/* ─── Supply Stats Node ─── */
const StatsNode = ({ data }) => {
  const { market } = data;
  if (!market) return null;
  return (
    <>
      <Handle type="target" position={Position.Left} className="!opacity-0 !w-0" />
      <div className="w-[320px] rounded-[24px] border border-white/[0.04] bg-[#060B18]/60 backdrop-blur-xl shadow-2xl p-6">
        <div className="text-[10px] text-[#00E5A0] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 pb-3 border-b border-white/[0.06]">
          <RiPieChartLine className="text-sm" />
          Supply Data
        </div>
        <div className="space-y-3">
          {[
            { label: "Circulating", value: fmtSupply(market.circulatingSupply) },
            { label: "Total Supply", value: fmtSupply(market.totalSupply) },
            { label: "Max Supply", value: fmtSupply(market.maxSupply) },
            {
              label: "ATH",
              value: market.ath ? `$${market.ath.toLocaleString()}` : "—",
            },
            {
              label: "From ATH",
              value:
                market.athChange != null
                  ? `${market.athChange.toFixed(1)}%`
                  : "—",
              color:
                market.athChange != null
                  ? market.athChange >= 0
                    ? "#00E5A0"
                    : "#ff6b5b"
                  : undefined,
            },
            {
              label: "30d Change",
              value:
                market.change30d != null
                  ? `${market.change30d >= 0 ? "+" : ""}${market.change30d.toFixed(2)}%`
                  : "—",
              color:
                market.change30d != null
                  ? market.change30d >= 0
                    ? "#00E5A0"
                    : "#ff6b5b"
                  : undefined,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-[12px]"
            >
              <span className="text-white/40 font-medium tracking-wide">{item.label}</span>
              <span
                className="font-mono font-medium text-white/80"
                style={{ color: item.color }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   LAYOUT ALGORITHM
   ═══════════════════════════════════════════════════════════════════════════ */

const parseMarkdownNodes = (mdText) => {
  const tokens = mdText.split(/(?=^##\s)/gm);
  const sections = [];
  tokens.forEach((token) => {
    if (!token.startsWith("##")) {
      if (token.trim().length > 0)
        sections.push({ title: "Overview", content: token.trim() });
      return;
    }
    const lines = token.split("\n");
    const title = lines[0].replace("##", "").trim();
    const content = lines.slice(1).join("\n").trim();
    if (content.length > 0) sections.push({ title, content });
  });
  return sections;
};

const buildLayout = (analysis, responses, winner, handleVote, voting, voted, market, onOpenDetail) => {
  const nodes = [];
  const edges = [];

  // 1. Hub node
  nodes.push({
    id: "hub",
    type: "hub",
    data: { analysis, market },
    position: { x: 0, y: 0 },
  });

  // 2. Stats node (below hub)
  if (market) {
    nodes.push({
      id: "stats",
      type: "stats",
      data: { market },
      position: { x: 50, y: 380 },
    });
    edges.push({
      id: "edge-hub-stats",
      source: "hub",
      target: "stats",
      type: "smoothstep",
      style: { stroke: "rgba(45,212,160,0.25)", strokeWidth: 1.5 },
    });
  }

  const AGENT_X = 700;
  const START_Y = -900;
  const AGENT_GAP_Y = 900;

  responses.forEach((resp, i) => {
    const agentId = resp.agentSlug;
    const isWinnerNode = winner === agentId;
    const agentY = START_Y + i * AGENT_GAP_Y;
    const wordCount = resp.content?.split(/\s+/).length || 0;

    // 3. Agent node
    nodes.push({
      id: `agent-${agentId}`,
      type: "agent",
      data: {
        agentSlug: agentId,
        responseMs: resp.responseMs,
        isWinnerNode,
        voted,
        isLoser: voted && !isWinnerNode,
        onVote: () => handleVote(agentId),
        voting: voting && winner === agentId,
        onOpenDetail,
        wordCount,
      },
      position: { x: AGENT_X, y: agentY },
    });

    // 4. Hub -> Agent edge
    edges.push({
      id: `edge-hub-${agentId}`,
      source: "hub",
      target: `agent-${agentId}`,
      type: "smoothstep",
      animated: isWinnerNode,
      style: {
        stroke: isWinnerNode ? "#f7c94b" : `${AGENT_MAP[agentId]?.avatarColor || "#00E5A0"}50`,
        strokeWidth: isWinnerNode ? 3 : 1.5,
      },
    });

    // 5. Section child nodes
    const sections = parseMarkdownNodes(resp.content);
    const SEC_X = AGENT_X + 560;
    const COL_GAP = 550;
    const ROW_GAP = 230;
    const totalRows = Math.ceil(sections.length / 2);
    const startSecY = agentY - (totalRows * ROW_GAP) / 2 + ROW_GAP / 2;

    sections.forEach((sec, idx) => {
      const secId = `sec-${agentId}-${idx}`;
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      nodes.push({
        id: secId,
        type: "section",
        data: { title: sec.title, content: sec.content, isWinnerNode },
        position: { x: SEC_X + col * COL_GAP, y: startSecY + row * ROW_GAP },
      });
      edges.push({
        id: `edge-${agentId}-${secId}`,
        source: `agent-${agentId}`,
        target: secId,
        type: "smoothstep",
        animated: isWinnerNode,
        style: {
          stroke: isWinnerNode
            ? "rgba(247,201,75,0.3)"
            : "rgba(255,255,255,0.04)",
          strokeWidth: 1.5,
        },
      });
    });
  });

  return { nodes, edges };
};

/* ═══════════════════════════════════════════════════════════════════════════
   CANVAS COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

const FlowMapCanvas = ({
  analysis,
  responses,
  winner,
  handleVote,
  voting,
  voted,
  market,
  onOpenDetail,
}) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const nodeTypes = useMemo(
    () => ({ hub: HubNode, agent: AgentNode, section: SectionNode, stats: StatsNode }),
    []
  );

  useEffect(() => {
    const { nodes: n, edges: e } = buildLayout(
      analysis,
      responses,
      winner,
      handleVote,
      voting,
      voted,
      market,
      onOpenDetail
    );
    setNodes(n);
    setEdges(e);
    setTimeout(() => fitView({ padding: 0.12, duration: 1200 }), 100);
  }, [analysis, responses, winner, voted, voting, handleVote, market, onOpenDetail, setNodes, setEdges, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      proOptions={{ hideAttribution: true }}
      fitView
      minZoom={0.03}
      maxZoom={1.5}
      className="bg-[#060710]"
    >
      <Background color="rgba(255,255,255,0.02)" size={1} gap={50} />
      <Controls
        className="!bg-[#0b0c10] !border !border-white/5 !fill-white !rounded-xl overflow-hidden [&>button]:!bg-[#0a0b12] hover:[&>button]:!bg-white/10 [&>button]:!border-white/5"
        showInteractive={false}
      />
    </ReactFlow>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   DETAIL PANEL (Slide-over for full reading)
   ═══════════════════════════════════════════════════════════════════════════ */
const DetailPanel = ({ agentSlug, responses, onClose }) => {
  const response = responses.find((r) => r.agentSlug === agentSlug);
  const agent = AGENT_MAP[agentSlug];
  if (!response || !agent) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed top-0 right-0 w-full sm:w-[560px] h-full z-[100] bg-[#060B18]/95 backdrop-blur-2xl border-l border-white/[0.04] shadow-2xl flex flex-col"
    >
      {/* Panel header */}
      <div className="flex items-center gap-4 p-6 sm:p-8 border-b border-white/[0.04] shrink-0">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.05]"
        >
          {AGENT_ICONS[agentSlug]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[16px] text-white/90">{agent.name}</h3>
          <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mt-1">
            {agent.type} · {response.content?.split(/\s+/).length || 0} words ·{" "}
            {(response.responseMs / 1000).toFixed(1)}s
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.05] transition-colors cursor-pointer"
        >
          <RiCloseLine className="text-xl" />
        </button>
      </div>

      {/* Panel body */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
        <div className="premium-markdown font-light text-[13.5px] leading-[1.8] text-white/70">
          <MarkdownRenderer content={response.content} />
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE CARD VIEW (for small screens)
   ═══════════════════════════════════════════════════════════════════════════ */
const MobileCardView = ({ analysis, responses, winner, handleVote, voting, voted, market }) => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="p-5 pb-24 space-y-5">
      {/* Token info */}
      <div className="rounded-[24px] bg-[#060B18]/60 backdrop-blur-xl border border-white/[0.04] shadow-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          {market?.image && (
            <img src={market.image} alt="" className="w-10 h-10 rounded-full border border-white/10" />
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-medium text-white/90 tracking-tight">{analysis.token}</h2>
            {market?.symbol && (
              <span className="text-[11px] font-mono text-white/40 tracking-widest uppercase mt-1 block">
                {market.symbol}{market.rank ? ` · Rank ${market.rank}` : ""}
              </span>
            )}
          </div>
          {market?.price != null && (
            <div className="text-right">
              <p className="text-sm font-bold font-mono">
                ${market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </p>
              {market.change24h != null && (
                <p className={`text-[10px] font-mono ${market.change24h >= 0 ? "text-[#2dd4a0]" : "text-[#ff6b5b]"}`}>
                  {market.change24h >= 0 ? "+" : ""}{market.change24h.toFixed(2)}%
                </p>
              )}
            </div>
          )}
        </div>
        <p className="text-[13px] font-light text-white/50 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/[0.03]">{analysis.question}</p>
      </div>

      {/* Winner banner */}
      {voted && winner && (
        <div className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-[#00E5A0]/10 border border-[#00E5A0]/20">
          <RiTrophyLine className="text-[#00E5A0]" />
          <span className="text-[11px] font-bold tracking-widest text-[#00E5A0] uppercase">
            {AGENT_MAP[winner]?.name} won
          </span>
        </div>
      )}

      {/* Agent cards */}
      {responses.map((resp, i) => {
        const agent = AGENT_MAP[resp.agentSlug];
        if (!agent) return null;
        const isWin = winner === resp.agentSlug;
        const isExp = expanded === resp.agentSlug;

        return (
          <div
            key={resp.agentSlug}
            className={`rounded-[24px] border overflow-hidden transition-all bg-[#060B18]/60 backdrop-blur-xl shadow-2xl ${isWin && voted ? "border-[#00E5A0]/40 shadow-[0_0_20px_rgba(0,229,160,0.1)]" : voted && !isWin ? "border-white/[0.02] opacity-50 grayscale" : "border-white/[0.04]"}`}
          >
            {isWin && (
              <div className="h-1 bg-gradient-to-r from-transparent via-[#00E5A0] to-transparent" />
            )}
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.05]"
                >
                  {AGENT_ICONS[resp.agentSlug]}
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium text-white/90">{agent.name}</p>
                  <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mt-0.5">
                    {agent.type}
                  </p>
                </div>
                {isWin && voted && (
                  <span className="text-[9px] text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-1 rounded-md flex items-center gap-1 font-bold uppercase tracking-widest">
                    <RiTrophyLine /> Winner
                  </span>
                )}
              </div>

              {!voted && (
                <button
                  onClick={() => handleVote(resp.agentSlug)}
                  disabled={voting}
                  className={`w-full py-3 rounded-xl text-[11px] font-semibold tracking-widest transition-all uppercase flex items-center justify-center gap-2 mb-2 ${
                    voting ? "bg-white/[0.04] text-white/30 cursor-not-allowed border border-white/[0.05]" : "bg-[#00E5A0] text-[#060B18] hover:bg-[#4AEDC4]"
                  }`}
                >
                  <RiCheckboxCircleLine className="text-sm" />
                  Select as Best
                </button>
              )}
            </div>

            <div className="border-t border-white/[0.04]">
              <button
                onClick={() => setExpanded(isExp ? null : resp.agentSlug)}
                className="w-full flex items-center justify-between px-5 py-4 text-[10px] font-semibold text-white/40 hover:text-white/60 transition-colors cursor-pointer uppercase tracking-widest bg-white/[0.01]"
              >
                <span className="flex items-center gap-2">
                  <RiSparklingLine className="text-sm text-[#00E5A0]" />
                  {isExp ? "Collapse" : "View Report"}
                </span>
                <RiArrowDownLine className={`transition-transform ${isExp ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {isExp && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 max-h-[50vh] overflow-y-auto custom-scrollbar">
                      <div className="premium-markdown font-light text-[12.5px] leading-[1.8] text-white/70">
                        <MarkdownRenderer content={resp.content} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function InfiniteComparisonPage({ params }) {
  const { id } = use(params);
  const { address } = useAppKitAccount();
  const [analysis, setAnalysis] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState(null);
  const [voting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const [viewMode, setViewMode] = useState("canvas"); // "canvas" | "cards"
  const [detailAgent, setDetailAgent] = useState(null);

  const market = useMarketData(analysis?.token);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const res = await fetch(`/api/analyze/${id}`);
        if (res.ok) {
          const data = await res.json();
          setAnalysis(data.analysis);
          setResponses(data.responses);
          const existingWinner = data.responses.find((r) => r.isWinner);
          if (existingWinner) {
            setWinner(existingWinner.agentSlug);
            setVoted(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch analysis:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalysis();
  }, [id]);

  // Auto-detect mobile for default view
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setViewMode("cards");
    }
  }, []);

  const handleVote = useCallback(
    async (agentSlug) => {
      if (voted || voting) return;
      setWinner(agentSlug);
      setVoting(true);
      try {
        const res = await fetch("/api/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ analysisId: id, winnerAgentSlug: agentSlug, walletAddress: address || null }),
        });
        if (res.ok) setVoted(true);
        else setWinner(null);
      } catch {
        setWinner(null);
      } finally {
        setVoting(false);
      }
    },
    [id, voted, voting]
  );

  const handleOpenDetail = useCallback((agentSlug) => {
    setDetailAgent(agentSlug);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Synchestra AI — ${analysis?.token}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#060B18] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-white/25 text-[10px] font-mono tracking-[0.2em] uppercase">
            Connecting to Intelligence Core...
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="fixed inset-0 bg-[#060B18] flex items-center justify-center">
        <div className="text-center p-8 bg-[#060B18]/60 backdrop-blur-xl rounded-[24px] border border-white/[0.04] max-w-sm shadow-2xl">
          <p className="text-white/50 mb-6 text-sm">Analysis not found</p>
          <Link
            href="/arena"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white/90 transition-colors text-xs font-semibold uppercase tracking-widest"
          >
            <RiArrowLeftLine />
            Back to Arena
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#060B18] w-screen h-screen overflow-hidden">
      {/* Global CSS */}
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 229, 160, 0.3);
        }
        .react-flow__node {
          cursor: default;
        }
        .premium-markdown .prose strong {
          color: #fff;
          font-weight: 500;
        }
        .premium-markdown .prose ul > li::marker {
          color: #00E5A0;
        }
        .premium-markdown .prose p {
          margin-bottom: 0.8em;
        }
      `}</style>

      {/* ── Floating HUD ── */}
      <div className="absolute top-0 left-0 right-0 p-5 sm:p-6 z-50 pointer-events-none flex justify-between items-start">
        {/* Left: Back */}
        <div className="pointer-events-auto">
          <Link
            href="/arena"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-[14px] bg-[#060B18]/80 backdrop-blur-2xl border border-white/[0.04] text-white/50 hover:text-white/90 hover:border-white/[0.08] hover:bg-[#060B18]/90 transition-all text-[10px] font-mono uppercase tracking-[0.15em] font-semibold shadow-xl"
          >
            <RiArrowLeftLine className="text-sm" />
            Arena
          </Link>
        </div>

        {/* Right: Status + Actions */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* View toggle */}
          <button
            onClick={() =>
              setViewMode(viewMode === "canvas" ? "cards" : "canvas")
            }
            className="flex items-center gap-2 px-4 py-3 rounded-[14px] bg-[#060B18]/80 backdrop-blur-2xl border border-white/[0.04] text-white/50 hover:text-white/90 hover:border-white/[0.08] transition-all text-[10px] font-mono uppercase tracking-[0.15em] font-semibold cursor-pointer shadow-xl"
          >
            {viewMode === "canvas" ? (
              <>
                <RiLayoutGridLine className="text-sm" />
                Cards
              </>
            ) : (
              <>
                <RiRoadMapLine className="text-sm" />
                Canvas
              </>
            )}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-3 rounded-[14px] bg-[#060B18]/80 backdrop-blur-2xl border border-white/[0.04] text-white/50 hover:text-white/90 hover:border-white/[0.08] transition-all text-[10px] font-mono uppercase tracking-[0.15em] font-semibold cursor-pointer shadow-xl"
          >
            <RiShareLine className="text-sm" />
            Share
          </button>

          {/* Status */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-[14px] bg-[#060B18]/80 backdrop-blur-2xl border border-[#00E5A0]/20 text-[#00E5A0] text-[10px] tracking-[0.15em] uppercase font-bold shadow-xl">
            <RiCheckboxCircleLine className="text-sm" />
            Online
          </div>
        </div>
      </div>

      {/* Winner HUD (bottom-left) */}
      <AnimatePresence>
        {voted && winner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-6 z-50 pointer-events-auto"
          >
            <div className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-[#060B18]/90 backdrop-blur-2xl border border-[#00E5A0]/30 shadow-[0_0_20px_rgba(0,229,160,0.15)]">
              <RiTrophyLine className="text-[#00E5A0] text-lg" />
              <span className="text-[11px] font-bold text-[#00E5A0] uppercase tracking-[0.15em]">
                {AGENT_MAP[winner]?.name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      {viewMode === "canvas" ? (
        <ReactFlowProvider>
          <FlowMapCanvas
            analysis={analysis}
            responses={responses}
            winner={winner}
            handleVote={handleVote}
            voting={voting}
            voted={voted}
            market={market}
            onOpenDetail={handleOpenDetail}
          />
        </ReactFlowProvider>
      ) : (
        <div className="w-full h-full overflow-y-auto pt-24 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <MobileCardView
              analysis={analysis}
              responses={responses}
              winner={winner}
              handleVote={handleVote}
              voting={voting}
              voted={voted}
              market={market}
            />
          </div>
        </div>
      )}

      {/* ── Detail Panel (slide-over) ── */}
      <AnimatePresence>
        {detailAgent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailAgent(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99]"
            />
            <DetailPanel
              agentSlug={detailAgent}
              responses={responses}
              onClose={() => setDetailAgent(null)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
