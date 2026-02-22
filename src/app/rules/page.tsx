"use client"

import dynamic from "next/dynamic"
import FadeIn from "@/components/fade-in"
import { AlertTriangle, Terminal, Code, Lock, ShieldAlert, Scale, Handshake } from "lucide-react"

const AnimatedBackground = dynamic(() => import("@/components/animted-bg"), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black bg-gradient-to-br from-black to-purple-950" />,
})

export default function Rules() {
    return (
        <main className="poppins relative min-h-screen text-white bg-gradient-to-b from-[#050906] to-[#0e2b1d] overflow-hidden pt-48 pb-24">
            <div className="fixed inset-0 z-10">
                <AnimatedBackground />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-20">
                <FadeIn>
                    <div className="text-center mb-24">
                        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 underline decoration-[#218c63] decoration-[16px] underline-offset-8">
                            Battle <span className="text-[#218c63]">Rules</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-bold uppercase tracking-[0.4em] italic">Protocol Engagement Guidelines v2.0</p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <RuleSection
                        number="01"
                        title="Scope of Engagement"
                        content="MythX is a controlled tactical environment. Attacking infrastructure outside of the *.mythx.tech domain is strictly prohibited. Any reconnaissance on university or sponsor infrastructure will lead to immediate termination of participation."
                        icon={<Lock className="w-8 h-8 text-[#218c63]" />}
                    />
                    <RuleSection
                        number="02"
                        title="Sponsor & Partner Data"
                        content="By participating, you acknowledge that selected high-performing profiles and registration data may be shared with our official Mission Partners (Sponsors) for recruitment, networking, and platform improvement purposes. We facilitate direct connections between elite talent and industry leaders."
                        icon={<Handshake className="w-8 h-8 text-emerald-400" />}
                    />
                    <RuleSection
                        number="03"
                        title="Code of Honor"
                        content="Team collaboration or flag sharing is a violation of the protocol. Publicly disclosing solutions before the mission concludes is forbidden. Each operative must secure their own breakthroughs."
                        icon={<Scale className="w-8 h-8 text-[#218c63]" />}
                    />
                    <RuleSection
                        number="04"
                        title="Resource Management"
                        content="Brute-forcing forms or excessive scraping is inefficient and prohibited. Use tactical analysis. Automated tools must be tuned to avoid disrupting the intelligence feed for other operatives."
                        icon={<Terminal className="w-8 h-8 text-emerald-400" />}
                    />
                </div>

                <FadeIn delay={0.6}>
                    <div className="mt-20 p-12 bg-[#218c63]/5 border border-[#218c63]/20 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ShieldAlert className="w-24 h-24 text-red-500" />
                        </div>
                        <p className="text-red-500 font-black uppercase tracking-[0.5em] text-xs mb-4">Zero Tolerance Warning</p>
                        <p className="text-gray-300 font-medium text-lg leading-relaxed">
                            Any breach of these protocols results in permanent disqualification, erasure from the global leaderboard, and blacklisting from all future Technocrats operations.
                        </p>
                    </div>
                </FadeIn>
            </div>
        </main>
    )
}

function RuleSection({ number, title, content, icon }: { number: string, title: string, content: string, icon: React.ReactNode }) {
    return (
        <FadeIn direction="up">
            <div className="bg-black/40 border border-white/5 p-10 rounded-[3rem] hover:bg-white/5 transition-all duration-500 group h-full">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div className="text-5xl font-black text-[#218c63] italic opacity-20 group-hover:opacity-40 transition-opacity">{number}</div>
                        <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">{icon}</div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white group-hover:text-[#218c63] transition-colors">{title}</h3>
                        <p className="text-gray-400 font-medium leading-relaxed text-sm">{content}</p>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
