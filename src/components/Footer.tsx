"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Twitter, Shield, ExternalLink, Globe } from "lucide-react"
import logo from "@/images/mythx_logo_no_bg.png"
import { cn } from "@/lib/utils"

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#030604] border-t border-white/5 text-white overflow-hidden py-24 pb-12 snap-end shrink-0">
      {/* BACKGROUND DECOR */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#218c63]/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

          {/* BRAND COLUMN */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="relative w-10 h-10">
                <Image
                  src={logo}
                  alt="MythX"
                  fill
                  className="object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-white">
                Myth<span className="text-[#218c63]">X</span>
              </span>
            </Link>
            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md italic">
              "A platform for likeminded people to create, compete, and collaborate."
            </p>

            <div className="flex gap-4">
              <SocialLink href="https://www.instagram.com/technocrats.kiet/" icon={<Instagram />} />
              <SocialLink href="https://x.com/technocrats_?lang=en" icon={<Twitter />} />
              <SocialLink href="https://www.linkedin.com/company/technocrats-kiet/" icon={<Linkedin />} />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#218c63]">Navigation</h4>
            <nav className="flex flex-col gap-5">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/#about">About Event</FooterLink>
              <FooterLink href="/#timeline">Battles Timeline</FooterLink>
              <FooterLink href="/information">Live Stats</FooterLink>
            </nav>
          </div>

          {/* RESOURCES */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#218c63]">Resources</h4>
            <nav className="flex flex-col gap-5">
              <FooterLink href="/rules">CTF Rules</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="https://discord.gg/EXq267jVA">Discord Server</FooterLink>
              <FooterLink href="https://www.technocrats.tech/">Official Site</FooterLink>
            </nav>
          </div>

          {/* COMMUNITY CTA */}
          <div className="lg:col-span-3">
            <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl relative overflow-hidden group">
              <h4 className="text-xl font-black mb-4 uppercase tracking-tighter">Join the Hub</h4>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed font-bold">
                Connect with likeminded people to create, compete, and collaborate.
              </p>
              <div className="flex flex-col gap-4 mt-6 w-full">
                <Link
                  href="https://discord.gg/EXq267jVA"
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-[#218c63]/10 border border-[#218c63]/25 hover:bg-[#218c63] hover:border-[#218c63] text-white font-black text-xs sm:text-sm px-4 sm:px-6 py-4 rounded-xl transition-all uppercase tracking-widest text-center"
                >
                  Discord <ExternalLink className="w-4 h-4 ml-1" />
                </Link>
                <Link
                  href="https://chat.whatsapp.com/YOUR_WHATSAPP_GROUP_LINK"
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-[#218c63]/10 border border-[#218c63]/25 hover:bg-[#218c63] hover:border-[#218c63] text-white font-black text-xs sm:text-sm px-4 sm:px-6 py-4 rounded-xl transition-all uppercase tracking-widest text-center"
                >
                  WhatsApp <ExternalLink className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
            © 2026 MythX. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#218c63] hover:border-[#218c63]/30 hover:bg-[#218c63]/5 transition-all group"
    >
      <div className="w-6 h-6 transition-transform group-hover:scale-110">
        {icon}
      </div>
    </a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-white transition-colors text-sm font-bold w-fit uppercase tracking-widest flex items-center gap-2 group"
    >
      <div className="w-1 h-1 bg-[#218c63] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      {children}
    </Link>
  )
}
