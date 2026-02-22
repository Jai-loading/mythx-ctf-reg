"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import dynamic from "next/dynamic"
import { Users, School, Globe, Loader2, RefreshCw, BarChart3 } from "lucide-react"
import FadeIn from "@/components/fade-in"

interface RegistrationStats {
    total: number
    fromKIET: number
    fromOthers: number
}

const AnimatedBackground = dynamic(() => import("@/components/animted-bg"), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />,
})

export default function InfoPage() {
    const [stats, setStats] = useState<RegistrationStats>({
        total: 0,
        fromKIET: 0,
        fromOthers: 0,
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const getRegistrations = async () => {
        try {
            setError(null)
            const response = await axios.get<RegistrationStats>("/api/register")
            setStats(response.data)
        } catch (err: any) {
            setError("Could not load stats. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getRegistrations()
        const interval = setInterval(getRegistrations, 600000) // 10 minutes
        return () => clearInterval(interval)
    }, [])

    return (
        <main className="relative min-h-screen pt-40 pb-20 px-6 flex items-center justify-center overflow-hidden">
            <div className="fixed inset-0 z-10">
                <AnimatedBackground />
            </div>

            <div className="relative z-20 max-w-5xl w-full">
                <FadeIn>
                    <div className="text-center mb-24">
                        <div className="flex items-center justify-center gap-4 text-[#218c63] mb-6">
                            <BarChart3 className="w-10 h-10" />
                            <span className="text-xs font-black uppercase tracking-[0.5em]">Live Feed Active</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">
                            Registration <span className="text-[#218c63]">Stats</span>
                        </h1>
                        <p className="text-gray-400 font-bold tracking-widest uppercase italic">Live registration analytics</p>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-16 h-16 text-[#218c63] animate-spin mb-6" />
                            <p className="text-[#218c63] font-black tracking-[0.4em] text-sm italic">SYNCHRONIZING ENCRYPTED PACKETS...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-950/20 border border-red-500/20 rounded-[3rem] p-16 text-center backdrop-blur-3xl">
                            <p className="text-red-400 font-bold mb-6 text-xl">{error}</p>
                            <button onClick={() => getRegistrations()} className="bg-red-500/10 border-2 border-red-500/50 text-red-400 py-4 px-10 rounded-2xl font-black uppercase tracking-tighter hover:bg-red-500 hover:text-white transition-all">
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-10">
                            <StatCard
                                title="Total Registered"
                                value={stats.total}
                                description="Participants registered globally"
                                icon={<Users className="w-8 h-8" />}
                                color="text-[#218c63]"
                            />
                            <StatCard
                                title="From KIET"
                                value={stats.fromKIET}
                                description="KIET student registrations"
                                icon={<School className="w-8 h-8" />}
                                color="text-emerald-400"
                            />
                            <StatCard
                                title="External"
                                value={stats.fromOthers}
                                description="From other institutions"
                                icon={<Globe className="w-8 h-8" />}
                                color="text-white"
                            />
                        </div>
                    )}

                    <div className="mt-20 flex items-center justify-center gap-4 text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#218c63]' : ''}`} />
                        Next sync in 10 minutes
                    </div>
                </FadeIn>
            </div>
        </main>
    )
}

function StatCard({ title, value, description, icon, color }: { title: string; value: number; description: string; icon: React.ReactNode; color: string }) {
    return (
        <div className="bg-black/40 backdrop-blur-3xl border border-white/5 hover:border-[#218c63]/50 transition-all duration-700 group overflow-hidden rounded-[3rem] p-10 relative">
            <div className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#218c63] to-transparent group-hover:w-full transition-all duration-1000" />
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#218c63]">{title}</h3>
                <div className={`${color} opacity-40 group-hover:opacity-100 transition-opacity duration-700`}>{icon}</div>
            </div>
            <div className={`text-7xl font-black tracking-tighter mb-4 ${color}`}>
                {value}
            </div>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-tight">
                {description}
            </p>
        </div>
    )
}
