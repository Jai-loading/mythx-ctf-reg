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
  loading: () => <div className="fixed inset-0 bg-[#050906]" />,
})

const CountdownTimer = dynamic(() => import("@/components/Countdown"), {
  ssr: false,
  loading: () => (
    <div className="h-[72px] flex justify-center items-center text-center text-lg text-[#218c63]">
      Loading...
    </div>
  ),
})


export default function Home() {
  const gradientColor = "rgba(33, 140, 99"
  const gradientOpacity = 0.4

  return (
    <main className="poppins relative w-full text-white bg-[#050906] overflow-x-hidden">
      <div className="fixed inset-0 z-10 pointer-events-none">
        <AnimatedBackground />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-32 sm:pt-48 pb-12 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center bg-transparent snap-start snap-always shrink-0 w-full">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tighter uppercase break-words w-full">
                Myth<span className="text-[#218c63]">X</span>
              </h1>
              <span className="text-xs sm:text-sm md:text-2xl font-medium lowercase tracking-[0.8em] opacity-50 mt-2">
                presents
              </span>
            </div>
            <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black leading-tight tracking-normal uppercase mb-8 sm:mb-12 text-white/90">
              An Endgame Protocol : <br className="flex sm:hidden" /><span className="text-[#218c63]">CTF</span>
            </h2>
            <p className="text-sm sm:text-lg md:text-xl text-gray-400 font-medium max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed px-2">
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

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-20 min-h-screen w-full flex items-center py-20 px-4 sm:px-6 bg-[#050906]/40 backdrop-blur-xl border-t border-[#218c63]/10 snap-start snap-always shrink-0">
        <div className="max-w-6xl mx-auto w-full">
          <FadeIn>
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
              <div className="lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left">
                <p className="text-[#218c63] font-black tracking-[0.4em] uppercase text-[10px] sm:text-xs">Community Vision</p>
                <h2 className="text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none break-words">
                  The <span className="text-[#218c63]">MythX</span> Hub
                </h2>
                <p className="text-sm sm:text-lg text-gray-400 font-medium leading-relaxed">
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
              <div className="lg:w-1/2 relative flex justify-center items-center w-full mt-10 lg:mt-0">
                <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] animate-float">
                  <Image
                    src={logo}
                    alt="MythX Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_30px_rgba(33,140,99,0.3)]"
                    priority
                  />
                </div>
                {/* Simplified background static glows instead of huge mutating blurs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#218c63]/10 rounded-full blur-[80px] pointer-events-none" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section id="timeline" className="relative z-30 min-h-screen w-full py-20 sm:py-32 px-4 sm:px-6 bg-transparent border-t border-[#218c63]/10 snap-start snap-always shrink-0">
        <div className="max-w-6xl mx-auto w-full">
          <FadeIn>
            <div className="text-center mb-16 sm:mb-24 mt-10 sm:mt-0">
              <h2 className="text-3xl lg:text-7xl font-black uppercase tracking-tighter mb-4">Event <span className="text-[#218c63]">Timeline</span></h2>
              <div className="h-1.5 w-16 sm:w-24 mx-auto bg-[#218c63] rounded-full shadow-[0_0_15px_#218c63]" />
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

      <section id="partners" className="relative z-40 min-h-screen w-full flex flex-col justify-center py-24 sm:py-48 px-4 sm:px-6 bg-[#050906]/40 backdrop-blur-xl border-t border-[#218c63]/10 snap-start snap-always shrink-0">
        <div className="max-w-7xl mx-auto w-full">
          <FadeIn>
            <div className="text-center mb-16 sm:mb-32">
              <p className="text-[#218c63] font-black tracking-[0.4em] sm:tracking-[0.6em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-6">Support the Protocol</p>
              <h2 className="text-3xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 sm:mb-8">
                Mission <br className="block sm:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#218c63] via-emerald-400 to-[#218c63]">Partners</span>
              </h2>
              <p className="text-gray-400 font-medium max-w-2xl mx-auto text-sm sm:text-lg leading-relaxed px-2">
                Empowering the next generation of cybersecurity talent through strategic industry collaboration.
              </p>
            </div>
          </FadeIn>

          {/* PARTNER PLACEHOLDERS → Coming Soon */}
          <div className="space-y-10 sm:space-y-16">
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

          <FadeIn delay={0.2}>
            <div className="mt-12 sm:mt-16 relative group overflow-hidden rounded-[2rem] sm:rounded-[3rem] p-px bg-gradient-to-r from-transparent via-[#218c63]/20 to-transparent">
              <div className="bg-[#050906]/80 backdrop-blur-3xl rounded-[2rem] sm:rounded-[3rem] p-8 md:p-20 text-center border border-white/5 relative z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-10 sm:h-16 bg-gradient-to-b from-[#218c63] to-transparent opacity-50" />
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 sm:mb-6 leading-none">Become a <br /> <span className="text-[#218c63]">Mission Partner</span></h3>
                <p className="text-gray-400 font-medium max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-lg px-2">
                  Showcase your brand at KIET's premier cybersecurity event and connect with top student talent across India.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                  <Link
                    href="mailto:partners@mythxctf.com"
                    className="bg-[#218c63] hover:bg-[#1a6e4d] text-white font-black px-10 py-4 sm:px-12 sm:py-5 rounded-2xl text-sm sm:text-base transition-all hover:scale-105 shadow-[0_0_40px_rgba(33,140,99,0.4)] uppercase tracking-widest w-full sm:w-auto"
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
      <section className="relative z-50 min-h-screen w-full flex flex-col justify-center items-center py-24 px-4 sm:px-6 bg-transparent border-t border-[#218c63]/10 overflow-hidden snap-start snap-always shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#218c63]/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 sm:mb-12 flex flex-col items-center">
              <span>Join the</span>
              <span className="text-[#218c63]">Endgame Protocol</span>
            </h2>
            <Link
              href="/register"
              className="inline-block bg-[#218c63] hover:bg-[#1a6e4d] text-white font-black py-6 px-12 sm:py-8 sm:px-20 rounded-[2rem] sm:rounded-[2.5rem] text-xl sm:text-3xl tracking-tighter uppercase transition-all duration-500 hover:scale-[1.05] shadow-[0_0_80px_rgba(33,140,99,0.5)] active:scale-95 border-b-[6px] sm:border-b-[8px] border-[#114b33]"
            >
              Join Battle
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}

function TimelineNode({ side, date, title, desc, icon, status = "pending" }: any) {
  const isLeft = side === "left"
  return (
    <FadeIn direction={isLeft ? "right" : "left"}>
      <div className={`relative flex flex-col ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center justify-center lg:mb-24 px-4 sm:px-0`}>
        {/* Content Card */}
        <div className={`w-full lg:w-[45%] ${isLeft ? "lg:text-right lg:pr-20" : "lg:text-left lg:pl-20"}`}>
          <div className={`group p-8 md:p-12 rounded-[3rem] border transition-all duration-300 relative overflow-hidden backdrop-blur-md hover:backdrop-blur-2xl ${status === "active" ? "bg-white/[0.05] border-[#218c63]/50 shadow-[0_0_40px_rgba(33,140,99,0.15)]" : "bg-white/[0.02] border-white/5 hover:border-[#218c63]/30 hover:bg-white/[0.08]"}`}>
            {/* Optimized top accent - simpler radial gradient instead of huge gaussian blur calculation */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(33,140,99,0.15),transparent_70%)] transition-opacity duration-300 ${status === "active" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />

            <span className={`text-[11px] font-black tracking-[0.6em] uppercase mb-6 block ${status === "active" ? "text-[#00ff9d]" : "text-gray-500"}`}>{date}</span>
            <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-[#00ff9d] transition-colors duration-300">{title}</h4>
            <p className="text-sm md:text-base text-gray-500 group-hover:text-gray-300 transition-colors duration-300 font-medium leading-relaxed">{desc}</p>
          </div>
        </div>

        {/* Central Indicator - Removed nested pulse/spin animations which stack heavily on GPU */}
        <div className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-[2rem] bg-[#050906] border-2 items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 ${status === "active" ? "border-[#218c63]/80 shadow-[0_0_20px_rgba(33,140,99,0.3)]" : "border-white/10 group-hover:border-[#218c63]/50"}`}>
          <div className={`transition-colors duration-300 ${status === "active" ? "text-[#00ff9d]" : "text-gray-600 group-hover:text-[#218c63]"}`}>
            {icon}
          </div>
        </div>

        <div className="hidden lg:block w-[45%]" />
      </div>
    </FadeIn>
  )
}


function PartnerCard({ size }: { size: "large" | "small" }) {
  return (
    <div className={`w-full ${size === "large" ? "aspect-[2/1] min-h-[200px]" : "aspect-[2/1] min-h-[140px]"} rounded-[2.5rem] bg-black/40 border-2 border-white/5 flex items-center justify-center p-8 grayscale hover:grayscale-0 hover:border-[#218c63]/40 hover:bg-[#218c63]/5 transition-all duration-300 group relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#218c63]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className={`font-black text-gray-700 group-hover:text-white transition-all uppercase tracking-[0.5em] text-center italic ${size === "large" ? "text-2xl" : "text-lg"}`}>
        Partner Logo
      </div>
    </div>
  )
}

