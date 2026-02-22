"use client"

import { useRef, useEffect } from "react"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import FadeIn from "@/components/fade-in"
import design1 from "@/images/Group 4609.png"
import design2 from "@/images/Group 4610.png"
import logo from "@/images/mythx_logo_no_bg.png"
import { Shield, Target, Zap, Trophy, Users, Globe, Calendar, CheckCircle2, ChevronRight } from "lucide-react"

const AnimatedBackground = dynamic(() => import("@/components/animted-bg"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black bg-gradient-to-br from-black to-purple-950" />,
})

const CountdownTimer = dynamic(() => import("@/components/Countdown"), {
  ssr: false,
  loading: () => (
    <div className="h-[72px] flex justify-center items-center text-center text-lg text-[#218c63]">
      Loading...
    </div>
  ),
})

const ThreeDLogo = dynamic(() => import("@/components/ThreeDLogo"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square flex items-center justify-center rounded-[3rem] bg-[#050906] shadow-[0_0_100px_rgba(33,140,99,0.08)]">
      <div className="w-12 h-12 border-4 border-[#218c63]/20 border-t-[#00ff9d] rounded-full animate-spin" />
    </div>
  ),
})

export default function Home() {
  const gradientColor = "rgba(33, 140, 99"
  const gradientOpacity = 0.4

  return (
    <main className="poppins relative min-h-screen text-white bg-[#050906] overflow-hidden">
      <div className="fixed inset-0 z-10">
        <AnimatedBackground />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-20 pt-48 pb-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="flex flex-col items-center mb-8">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tighter uppercase">
                Myth<span className="text-[#218c63]">X</span>
              </h1>
              <span className="text-sm md:text-2xl font-medium lowercase tracking-[0.8em] opacity-50 mt-4 md:mt-2">
                presents
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black leading-tight tracking-normal uppercase mb-12 text-white/90 whitespace-nowrap">
              An Endgame Protocol : <span className="text-[#218c63]">CTF</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-medium max-w-3xl mx-auto mb-16 leading-relaxed">
              Decoding vulnerabilities. Exploiting weaknesses. Capture the Flag in the ultimate cybersecurity arena.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link
                href="/register"
                className="bg-[#218c63] hover:bg-[#1a6e4d] text-white px-12 py-5 rounded-2xl text-lg font-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(33,140,99,0.4)] uppercase tracking-tighter w-full sm:w-auto text-center"
              >
                Join Battle
              </Link>
              <Link
                href="#about"
                className="bg-white/5 border border-white/10 hover:border-[#218c63] text-white px-12 py-5 rounded-2xl text-lg font-black transition-all hover:scale-105 backdrop-blur-md uppercase tracking-tighter w-full sm:w-auto text-center font-bold"
              >
                About Us
              </Link>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.8em] mb-10 text-gray-500">Event Begins In</p>
            {/* Fixed the NaN error by passing targetDate */}
            <CountdownTimer targetDate="2026-03-21T00:00:00" />
          </div>
        </FadeIn>
      </section>

      {/* SCROLL INDICATOR */}
      <div className="relative z-20 flex justify-center -mt-16 pb-8 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-bounce opacity-40">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-500">Scroll</span>
          <svg className="w-4 h-4 text-[#218c63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-20 py-32 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2 space-y-8">
                <p className="text-[#218c63] font-black tracking-[0.4em] uppercase text-xs">Community Vision</p>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                  The <span className="text-[#218c63]">MythX</span> Hub
                </h2>
                <p className="text-lg text-gray-400 font-medium leading-relaxed">
                  We are a new community focusing on creating a platform/hub for likeminded people to create, compete, and collaborate with each other. The MythX CTF is our flagship operation to bring the best minds together in a unified arena.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div className="space-y-2">
                    <h4 className="text-3xl font-black text-white">500+</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#218c63]">Members</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-3xl font-black text-white">20+</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#218c63]">Challenges</p>
                  </div>
                </div>
                <div className="pt-8 text-center sm:text-left">
                  <Link href="/about" className="group inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs hover:text-[#218c63] transition-colors">
                    Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <ThreeDLogo logoSrc={logo.src} />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#218c63]/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#218c63]/5 rounded-full blur-[60px] pointer-events-none" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section id="timeline" className="relative z-20 py-32 px-6 border-t border-white/5 bg-transparent backdrop-blur-[2px]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4">Event <span className="text-[#218c63]">Timeline</span></h2>
              <div className="h-1.5 w-24 mx-auto bg-[#218c63] rounded-full shadow-[0_0_15px_#218c63]" />
            </div>
          </FadeIn>

          <div className="relative">
            {/* Animated Connector Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#218c63]/40 to-transparent animate-energy-flow h-[50%]" />
            </div>

            <div className="space-y-12 lg:space-y-0 relative">
              <TimelineNode
                side="left"
                date="Feb 21"
                title="Registration Starts"
                desc="Registration opens for university and independent teams globally."
                status="active"
                icon={<Users className="w-5 h-5" />}
              />
              <TimelineNode
                side="right"
                date="March 20"
                title="Registration Ends"
                desc="Final deadline to submit your team credentials and verification."
                icon={<CheckCircle2 className="w-5 h-5" />}
              />
              <TimelineNode
                side="left"
                date="March 21-22"
                title="Online Round"
                desc="48-hour Jeopardy-style qualification round. Top 15 teams advance."
                icon={<Globe className="w-5 h-5" />}
              />
              <TimelineNode
                side="right"
                date="March 23"
                title="Results Announced"
                desc="Finalist verification and official leaderboard publication."
                icon={<Trophy className="w-5 h-5" />}
              />
              <TimelineNode
                side="left"
                date="April 11-12"
                title="Offline Finals"
                desc="On-site attack/defense finals. The ultimate battle for total control."
                icon={<Shield className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>
      </section >

      <section id="partners" className="relative z-20 py-48 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-32">
              <p className="text-[#218c63] font-black tracking-[0.6em] uppercase text-xs mb-6">Support the Protocol</p>
              <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8">
                Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#218c63] via-emerald-400 to-[#218c63]">Partners</span>
              </h2>
              <p className="text-gray-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                Empowering the next generation of cybersecurity talent through strategic industry collaboration.
              </p>
            </div>
          </FadeIn>

          {/* PARTNER PLACEHOLDERS → Coming Soon */}
          <div className="space-y-16">
            <div className="flex items-center gap-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#218c63]/30 to-transparent" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 whitespace-nowrap">Strategic Partners</p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#218c63]/30 to-transparent" />
            </div>
            <div className="flex flex-col items-center justify-center py-20 gap-6 rounded-[3rem] border border-white/5 bg-white/[0.01]">
              <div className="w-16 h-16 rounded-2xl bg-[#218c63]/10 border border-[#218c63]/20 flex items-center justify-center">
                <Globe className="w-7 h-7 text-[#218c63]/60" />
              </div>
              <p className="text-gray-500 font-bold tracking-widest uppercase text-xs">Partner announcements coming soon</p>
              <p className="text-gray-600 text-sm max-w-md text-center leading-relaxed">We are actively onboarding industry partners. Check back closer to the event date.</p>
            </div>
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-16 relative group overflow-hidden rounded-[3rem] p-px bg-gradient-to-r from-transparent via-[#218c63]/20 to-transparent">
              <div className="bg-[#050906]/80 backdrop-blur-3xl rounded-[3rem] p-12 md:p-20 text-center border border-white/5 relative z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#218c63] to-transparent opacity-50" />
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">Become a <br /> <span className="text-[#218c63]">Mission Partner</span></h3>
                <p className="text-gray-400 font-medium max-w-xl mx-auto mb-10 text-lg">
                  Showcase your brand at KIET's premier cybersecurity event and connect with top student talent across India.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                  <Link
                    href="mailto:partners@mythxctf.com"
                    className="bg-[#218c63] hover:bg-[#1a6e4d] text-white font-black px-12 py-5 rounded-2xl text-base transition-all hover:scale-105 shadow-[0_0_40px_rgba(33,140,99,0.4)] uppercase tracking-widest w-full sm:w-auto"
                  >
                    Partner with Us
                  </Link>
                  <p className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-600">MythX CTF · KIET · 2026</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-20 py-24 px-6 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#218c63]/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <FadeIn>
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-12 flex flex-col items-center">
              <span>Join the</span>
              <span className="text-[#218c63]">Endgame Protocol</span>
            </h2>
            <Link
              href="/register"
              className="inline-block bg-[#218c63] hover:bg-[#1a6e4d] text-white font-black py-8 px-20 rounded-[2.5rem] text-3xl tracking-tighter uppercase transition-all duration-500 hover:scale-[1.05] shadow-[0_0_80px_rgba(33,140,99,0.5)] active:scale-95 border-b-[8px] border-[#114b33]"
            >
              Join Battle
            </Link>
          </FadeIn>
        </div>
      </section>
    </main >
  )
}

function TimelineNode({ side, date, title, desc, icon, status = "pending" }: any) {
  const isLeft = side === "left"
  return (
    <FadeIn direction={isLeft ? "right" : "left"}>
      <div className={`relative flex flex-col ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center justify-center lg:mb-24 px-4 sm:px-0`}>
        {/* Content Card */}
        <div className={`w-full lg:w-[45%] ${isLeft ? "lg:text-right lg:pr-20" : "lg:text-left lg:pl-20"}`}>
          <div className={`group p-8 md:p-12 rounded-[3rem] bg-white/[0.02] backdrop-blur-3xl border transition-all duration-700 relative overflow-hidden ${status === "active" ? "border-[#218c63]/40 shadow-[0_0_50px_rgba(33,140,99,0.15)]" : "border-white/5 hover:border-[#218c63]/30 hover:bg-white/[0.04]"}`}>
            {/* Glowing Accent */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[40px] rounded-full transition-opacity duration-700 ${status === "active" ? "bg-[#218c63]/20 opacity-100" : "bg-[#218c63]/10 opacity-0 group-hover:opacity-100"}`} />

            <span className={`text-[11px] font-black tracking-[0.6em] uppercase mb-6 block ${status === "active" ? "text-[#00ff9d]" : "text-gray-500"}`}>{date}</span>
            <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-[#00ff9d] transition-colors duration-500">{title}</h4>
            <p className="text-sm md:text-base text-gray-500 group-hover:text-gray-300 transition-colors duration-500 font-medium leading-relaxed">{desc}</p>
          </div>
        </div>

        {/* Central Indicator */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-20 h-20 rounded-[2.5rem] bg-[#050906] border-2 border-white/5 items-center justify-center z-10 transition-all duration-700 group-hover:border-[#218c63]/50 group-hover:scale-110 shadow-2xl">
          <div className={`transition-all duration-700 group-hover:rotate-[360deg] ${status === "active" ? "text-[#00ff9d] drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]" : "text-gray-700 group-hover:text-[#218c63]"}`}>
            {icon}
          </div>
          {status === "active" && (
            <>
              <div className="absolute inset-0 rounded-[2.5rem] bg-[#218c63]/10 animate-pulse" />
              <div className="absolute -inset-2 rounded-[3rem] border border-[#218c63]/20 animate-spin-slow pointer-events-none" />
            </>
          )}
        </div>

        <div className="hidden lg:block w-[45%]" />
      </div>
    </FadeIn>
  )
}


function PartnerCard({ size }: { size: "large" | "small" }) {
  return (
    <div className={`w-full ${size === "large" ? "aspect-[2/1] min-h-[250px]" : "aspect-[2/1] min-h-[180px]"} rounded-[2.5rem] bg-white/[0.03] border-2 border-white/5 backdrop-blur-xl flex items-center justify-center p-12 grayscale hover:grayscale-0 hover:border-[#218c63]/60 hover:bg-[#218c63]/5 transition-all duration-700 group relative overflow-hidden shadow-2xl`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#218c63]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={`font-black text-gray-700 group-hover:text-white transition-all uppercase tracking-[0.5em] text-center italic drop-shadow-[0_0_10px_rgba(33,140,99,0.2)] ${size === "large" ? "text-3xl" : "text-xl"}`}>
        Partner Logo
      </div>
      <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-[#218c63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}

