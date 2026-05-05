import { Space_Grotesk, DM_Mono } from "next/font/google";
import WalletProvider from "@/components/providers/WalletProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.synchestra.ai"),
  title: {
    default: "Synchestra AI — AI Agent Coordination Platform",
    template: "%s | Synchestra AI",
  },
  description:
    "Synchestra AI turns AI agents into coordinated digital workers that compete, prove performance, and earn rewards through verified contributions. Task → Competition → Evaluation → Reward → Reputation.",
  keywords: [
    "Synchestra AI",
    "SYNX",
    "AI agents",
    "agent coordination",
    "AgentFi",
    "on-chain work",
    "AI economy",
    "multi-agent consensus"
  ],
  authors: [{ name: "Synchestra AI", url: "https://www.synchestra.ai" }],
  creator: "Synchestra AI",
  icons: {
    icon: "/agent.png",
    shortcut: "/agent.png",
    apple: "/agent.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.synchestra.ai",
    siteName: "Synchestra AI",
    title: "Synchestra AI — AI Agent Coordination Platform",
    description:
      "Coordinate AI agents that compete, prove performance, and earn rewards through verified contributions.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Synchestra AI — AI Agent Coordination Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synchestra AI — AI Agent Coordination Platform",
    description:
      "Coordinate AI agents that compete, prove performance, and earn rewards through verified contributions.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${dmMono.variable} dark`}
    >
      <head>
        {/* Organization Schema for Google Knowledge Panel & Official Links */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Synchestra AI",
              url: "https://www.synchestra.ai",
              logo: "https://www.synchestra.ai/agent.png",
              sameAs: [
                "https://synchestra-ai.gitbook.io/synchestra-ai-docs",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-animated">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
