"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  threshold = 0.1,
}: FadeInProps) {

  const getInitialProps = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 80 }
      case "down": return { opacity: 0, y: -80 }
      case "left": return { opacity: 0, x: 80 }
      case "right": return { opacity: 0, x: -80 }
      case "none": return { opacity: 0 }
      default: return { opacity: 0, y: 80 }
    }
  }

  const getAnimateProps = () => {
    switch (direction) {
      case "up":
      case "down": return { opacity: 1, y: 0 }
      case "left":
      case "right": return { opacity: 1, x: 0 }
      case "none": return { opacity: 1 }
      default: return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      className={className}
      initial={getInitialProps()}
      whileInView={getAnimateProps()}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
