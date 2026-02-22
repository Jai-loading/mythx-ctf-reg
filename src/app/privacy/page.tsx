"use client"

import dynamic from "next/dynamic"
import FadeIn from "@/components/fade-in"
import { ShieldCheck, EyeOff, Server, FileText, Share2, Database, Users } from "lucide-react"

const AnimatedBackground = dynamic(() => import("@/components/animted-bg"), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black bg-gradient-to-br from-black to-purple-950" />,
})

export default function Privacy() {
    return (
        <main className="poppins relative min-h-screen text-white bg-gradient-to-b from-[#050906] to-[#0e2b1d] overflow-hidden pt-48 pb-24">
            <div className="fixed inset-0 z-10">
                <AnimatedBackground />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-20">
                <FadeIn>
                    <div className="text-center mb-24">
                        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 underline decoration-[#218c63] decoration-[16px] underline-offset-8">
                            Privacy <span className="text-[#218c63]">Policy</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-bold uppercase tracking-[0.4em] italic">Data Protection Protocol v2.5</p>
                    </div>
                </FadeIn>

                <div className="bg-black/40 border border-white/5 p-12 md:p-20 rounded-[4rem] backdrop-blur-3xl space-y-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#218c63]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <Section
                        title="Data Collection"
                        icon={<ShieldCheck className="w-10 h-10 text-[#218c63]" />}
                        content="We collect essential operative data: Full Name, Institutional Email, Phone Number, and Academic credentials. This data is used for authentication and to facilitate your participation in the CTF."
                    />

                    <Section
                        title="Partner Collaboration"
                        icon={<Share2 className="w-10 h-10 text-emerald-400" />}
                        content="MythX works in collaboration with industry partners to bridge the gap between learning and professional opportunities. Your profile and performance may be shared with our official partners for networking and recruitment purposes."
                    />

                    <Section
                        title="Secure Storage"
                        icon={<Database className="w-10 h-10 text-[#218c63]" />}
                        content="All submitted documents are stored securely using AWS infrastructure. Access is strictly limited to authorized community leads for verification purposes only."
                    />

                    <Section
                        title="Community Platforms"
                        icon={<Users className="w-10 h-10 text-emerald-400" />}
                        content="By joining our WhatsApp or Discord platforms, you agree to share your platform profile with the community. We encourage all members to maintain professional conduct."
                    />
                </div>

                <FadeIn delay={0.6}>
                    <div className="mt-20 text-center">
                        <p className="text-gray-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4">Empowered by Technocrats</p>
                        <p className="text-gray-600 font-medium italic">Latest Revision: 22 Feb 2026</p>
                    </div>
                </FadeIn>

            </div>
        </main>
    )
}

function Section({ title, icon, content }: { title: string, icon: React.ReactNode, content: string }) {
    return (
        <FadeIn direction="up">
            <div className="space-y-6 group">
                <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-[#218c63]/5 border border-[#218c63]/10 group-hover:bg-[#218c63]/10 transition-colors duration-500">
                        {icon}
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-[#218c63] transition-colors duration-500">{title}</h3>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed font-medium pl-0 md:pl-24 group-hover:text-gray-300 transition-colors">
                    {content}
                </p>
            </div>
        </FadeIn>
    )
}
