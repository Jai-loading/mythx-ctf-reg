"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Shield } from "lucide-react"
import logo from "@/images/mythx_logo_no_bg.png"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-700 px-6",
        isScrolled
          ? "py-4 bg-[#050906]/70 backdrop-blur-3xl border-b border-[#218c63]/15 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          : "py-8 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110 group-active:scale-95">
            <Image
              src={logo}
              alt="MythX Logo"
              fill
              className="object-contain"
              sizes="48px"
            />
          </div>
          <span className="text-xl font-black tracking-tighter text-white flex items-center uppercase leading-none">
            Myth<span className="text-[#218c63]">X</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink href="/" active={pathname === "/"}>Home</NavLink>
          <NavLink href="/#about" active={false}>About</NavLink>
          <NavLink href="/#timeline" active={false}>Timeline</NavLink>
          <NavLink href="/#partners" active={false}>Partners</NavLink>
          <NavLink href="/information" active={pathname === "/information"}>Stats</NavLink>

          <Link
            href="/register"
            className={cn(
              "group relative px-8 py-3 rounded-xl text-xs font-black transition-all hover:scale-105 active:scale-95 uppercase tracking-[0.2em] overflow-hidden",
              pathname === "/register"
                ? "bg-[#1a6e4d] text-white shadow-[0_0_30px_rgba(33,140,99,0.6)]"
                : "bg-[#218c63] hover:bg-[#1a6e4d] text-white shadow-[0_0_25px_rgba(33,140,99,0.3)]"
            )}
          >
            <span className="relative z-10">Register</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-white p-2.5 hover:bg-white/5 rounded-xl transition-all active:scale-90"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={26} className="text-[#218c63]" /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={cn(
        "fixed inset-0 top-0 bg-black/98 backdrop-blur-[100px] z-[55] md:hidden transition-all duration-700 flex flex-col p-8 pt-32 gap-10 items-center justify-center",
        isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
      )}>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-10">
          <Shield className="w-24 h-24 text-[#218c63]" />
        </div>

        <MobileNavLink href="/" active={pathname === "/"} onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
        <MobileNavLink href="/#about" active={false} onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
        <MobileNavLink href="/#timeline" active={false} onClick={() => setIsMobileMenuOpen(false)}>Timeline</MobileNavLink>
        <MobileNavLink href="/#partners" active={false} onClick={() => setIsMobileMenuOpen(false)}>Partners</MobileNavLink>
        <MobileNavLink href="/information" active={pathname === "/information"} onClick={() => setIsMobileMenuOpen(false)}>Stats</MobileNavLink>

        <Link
          href="/register"
          onClick={() => setIsMobileMenuOpen(false)}
          className="bg-[#218c63] text-white px-10 py-4 rounded-2xl text-xl font-black w-full max-w-xs text-center shadow-[0_0_40px_rgba(33,140,99,0.4)] uppercase tracking-widest mt-2"
        >
          Register Now
        </Link>
      </div>
    </nav>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-xs font-black uppercase tracking-[0.3em] transition-all relative group",
        active ? "text-[#218c63]" : "text-gray-400 hover:text-white"
      )}
    >
      {children}
      <span className={cn(
        "absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-[#218c63] transition-all rounded-full shadow-[0_0_8px_#218c63]",
        active ? "w-full" : "w-0 group-hover:w-full"
      )} />
    </Link>
  )
}

function MobileNavLink({ href, active, children, onClick }: { href: string; active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-4xl font-black transition-colors uppercase tracking-tighter",
        active ? "text-[#218c63]" : "text-white hover:text-[#218c63]"
      )}
    >
      {children}
    </Link>
  )
}
