"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import FadeIn from "@/components/fade-in"
import { Shield, Target, Zap, Users } from "lucide-react"

const AnimatedBackground = dynamic(() => import("@/components/animted-bg"), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black bg-gradient-to-br from-black to-purple-950" />,
})

export default function About() {
    return (
        <main className="poppins relative min-h-screen text-white bg-gradient-to-b from-[#050906] to-[#0e2b1d] overflow-hidden pt-40 pb-20">
            <div className="fixed inset-0 z-10">
                <AnimatedBackground />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-20">
                <FadeIn>
                    <div className="text-center mb-24">
                        <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 underline decoration-[#218c63] decoration-8">
                            About <span className="text-[#218c63]">MythX</span>
                        </h1>
                        <p className="text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            The ultimate proving ground for the next generation of cybersecurity operatives.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                    <InfoCard
                        icon={<Shield className="w-10 h-10 text-[#218c63]" />}
                        title="The Vision"
                        content="To bridge the gap between theoretical security concepts and real-world exploitation, fostering a community of ethical hackers who can think like the adversary to defend the enterprise."
                    />
                    <InfoCard
                        icon={<Target className="w-10 h-10 text-emerald-400" />}
                        title="The Objective"
                        content="Capture the Flag (CTF) isn't just a game. It's an intensive practice of digital forensics, reverse engineering, and vulnerability research that sharpens the mind and the skill set."
                    />
                    <InfoCard
                        icon={<Zap className="w-10 h-10 text-[#218c63]" />}
                        title="Endgame Protocol"
                        content="Our signature event structure moves from broad online qualifications to a rigorous, high-pressure offline finals, identifying the most elite talent in the ecosystem."
                    />
                    <InfoCard
                        icon={<Users className="w-10 h-10 text-emerald-400" />}
                        title="By Technocrats"
                        content="Organized by Technocrats, the premier technical club of KIET Deemed to be University, with a legacy of building production-grade solutions and hosting elite-level competitions."
                    />
                </div>

                {/* DETAILED STATS/INFO AREA */}
                <FadeIn delay={0.4}>
                    <div className="bg-white/5 border border-white/5 backdrop-blur-3xl rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#218c63] to-transparent" />

                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Evolution of <span className="text-[#218c63]">MythX</span></h2>
                        <div className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed font-medium space-y-6">
                            <p>
                                The MythX CTF started as a small initiative to inspire cybersecurity passion within our local campus. It has since evolved into a national-level attraction, bringing together hundreds of students from various institutions across the country.
                            </p>
                            <p>
                                In this edition, "An Endgame Protocol", we are raising the stakes with complex multi-stage challenges that simulate real-world infrastructure vulnerabilities. Participants will need more than just tools—they will need persistence, lateral thinking, and a deep understanding of computer systems.
                            </p>
                            <p>
                                Whether you are an aspiring student or a seasoned enthusiast, MythX provides the platform to showcase your talent, learn from peers, and claim your place on the leaderboard.
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </main>
    )
}

function InfoCard({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
    return (
        <FadeIn direction="up">
            <div className="p-10 rounded-[2.5rem] bg-black/40 border border-white/5 hover:border-[#218c63]/50 transition-all duration-500 group">
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">{icon}</div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">{title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed group-hover:text-gray-300 transition-colors">{content}</p>
            </div>
        </FadeIn>
    )
}
