import Image from "next/image";
import Link from "next/link";
import { RiTwitterXLine, RiGithubLine, RiBookLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <Image src="/logo.png" alt="Synchestra Logo" width={150} height={50} />
              
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-8">
              The ultimate AI agent coordination platform. Coordinate digital workers that compete, prove performance, and earn rewards through verified contributions.
            </p>
          </div>

          {/* Platform Links */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-xs">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/agents" className="text-white/40 hover:text-white transition-colors text-sm">Agents</Link></li>
              <li><Link href="/arena" className="text-white/40 hover:text-white transition-colors text-sm">Compare</Link></li>
              <li><Link href="/leaderboard" className="text-white/40 hover:text-[#00E5A0] transition-colors text-sm">Board</Link></li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-xs">Ecosystem & Social</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://bscscan.com/token/0xd3144dd40AcA457B5196B64977970D26B955e59C" target="_blank" className="group flex items-center gap-2 text-white/40 hover:text-[#f3ba2f] transition-colors text-sm">
                  <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:border-[#f3ba2f]/40 transition-colors">
                    <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025" alt="BSC" className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  BSC Scan (Contract)
                </a>
              </li>
              <li>
                <a href="https://x.com/officialsynxai" target="_blank" className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
                  <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:border-white/[0.3] transition-colors">
                    <RiTwitterXLine className="text-xs" />
                  </div>
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="https://aisynx.gitbook.io/aisynx-docs" className="group flex items-center gap-2 text-white/40 hover:text-[#4AEDC4] transition-colors text-sm">
                  <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:border-[#4AEDC4]/40 transition-colors">
                    <RiBookLine className="text-xs" />
                  </div>
                  Documentation
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/[0.05] flex justify-center items-center gap-4">
          <p className="text-white/30 text-xs font-mono">
            © {new Date().getFullYear()} Synchestra AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
