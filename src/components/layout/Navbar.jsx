"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSwordLine,
  RiTrophyLine,
  RiUser3Line,
  RiWallet3Line,
  RiArrowLeftRightLine,
  RiMenu4Line,
  RiCloseLine,
  RiHome4Line,
} from "react-icons/ri";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home", icon: RiHome4Line },
  { href: "/arena", label: "Arena", icon: RiSwordLine },
  { href: "/compare", label: "Compare", icon: RiArrowLeftRightLine },
  { href: "/leaderboard", label: "Board", icon: RiTrophyLine },
];

export default function Navbar() {
  const pathname = usePathname();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled ? "pt-4" : "pt-6"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group relative z-20">
              <Image src="/logo.png" alt="Synchestra Logo" width={150} height={46} className="transition-transform duration-300 group-hover:scale-105" />
            </Link>

            {/* Desktop Nav (The Pill Container) */}
            <nav className={cn(
              "hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 rounded-full border px-2 py-1.5 transition-all duration-500 z-20",
              isScrolled 
                ? "bg-[#060B18]/90 backdrop-blur-xl border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.5)]" 
                : "bg-white/[0.02] backdrop-blur-md border-white/[0.04]"
            )}>
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href ||
                      pathname?.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative group px-5 py-2 rounded-full"
                  >
                    <span
                      className={cn(
                        "relative z-10 text-[13px] font-medium tracking-wide transition-colors duration-300",
                        isActive
                          ? "text-white"
                          : "text-white/60 group-hover:text-white"
                      )}
                    >
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill-active"
                        className="absolute inset-0 bg-white/[0.08] rounded-full -z-0"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 z-20">
              {isConnected && (
                <Link
                  href="/profile"
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  <RiUser3Line className="text-lg" />
                </Link>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => open()}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-[13px] tracking-wide transition-all duration-300 cursor-pointer shadow-lg",
                  isConnected
                    ? "bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] hover:bg-[#00E5A0]/15"
                    : "bg-[#00E5A0] text-[#060B18] hover:bg-[#4AEDC4] shadow-[0_0_20px_rgba(0,229,160,0.15)]"
                )}
              >
                {!isConnected && <RiWallet3Line className="text-[15px]" />}
                <span className="font-mono">
                  {isConnected ? truncatedAddress : "Launch App"}
                </span>
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                {mobileMenuOpen ? (
                  <RiCloseLine className="text-xl" />
                ) : (
                  <RiMenu4Line className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden absolute top-full left-4 right-4 mt-2 overflow-hidden border border-white/[0.08] bg-[#060B18]/95 backdrop-blur-2xl rounded-3xl shadow-2xl"
            >
              <div className="flex flex-col p-4 gap-2">
                {[...navLinks, { href: "/profile", label: "Profile", icon: RiUser3Line }].map((link, i) => {
                  if (link.href === "/profile" && !isConnected) return null;
                  
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname === link.href ||
                        pathname?.startsWith(link.href + "/");

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-2xl text-[15px] font-medium transition-colors",
                          isActive
                            ? "bg-[#00E5A0]/10 text-[#00E5A0]"
                            : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                        )}
                      >
                        <link.icon className="text-lg" />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 z-[90] bg-[#060B18]/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
}
