"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate?: string
}

export default function CountdownTimer({ targetDate = "2026-03-21T00:00:00" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const target = new Date(targetDate).getTime()

    if (isNaN(target)) {
      console.error("Invalid targetDate provided to CountdownTimer")
      return
    }

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  if (!mounted) return null

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-6 md:gap-10 text-center">
      <TimerUnit value={timeLeft.days} label="Days" />
      <span className="text-2xl sm:text-4xl md:text-7xl font-black text-[#218c63] animate-pulse pb-4 sm:pb-0">:</span>
      <TimerUnit value={timeLeft.hours} label="Hours" />
      <span className="text-2xl sm:text-4xl md:text-7xl font-black text-[#218c63] animate-pulse pb-4 sm:pb-0">:</span>
      <TimerUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-2xl sm:text-4xl md:text-7xl font-black text-[#218c63] animate-pulse pb-4 sm:pb-0">:</span>
      <TimerUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}

function TimerUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative">
        <span className="text-3xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          {value.toString().padStart(2, "0")}
        </span>
        <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 bg-[#218c63] scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
      <span className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-gray-500 mt-2 sm:mt-4 group-hover:text-[#218c63] transition-colors">
        {label}
      </span>
    </div>
  )
}
