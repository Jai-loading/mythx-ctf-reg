
import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animationFrameId: number;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    const themeColors = [
      "#0e2b1d",
      "#20553c",
      "#218c63",
      "#82a18a",
    ]

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      canvas: HTMLCanvasElement
      ctx: CanvasRenderingContext2D

      constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        themeColors: string[]
      ) {
        this.canvas = canvas
        this.ctx = ctx

        this.x = Math.random() * this.canvas.width
        this.y = Math.random() * this.canvas.height
        this.size = Math.random() * 2 + 1.5
        this.speedX = Math.random() * 0.4 - 0.2
        this.speedY = Math.random() * 0.4 - 0.2
        this.color =
          themeColors[Math.floor(Math.random() * themeColors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > this.canvas.width) this.x = 0
        if (this.x < 0) this.x = this.canvas.width
        if (this.y > this.canvas.height) this.y = 0
        if (this.y < 0) this.y = this.canvas.height
      }

      draw() {
        this.ctx.fillStyle = this.color

        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        this.ctx.fill()
      }
    }


    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(
      80, // Lower max particle count to prevent dense-screen lag
      Math.floor((canvas.width * canvas.height) / 16000)
    )

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas, ctx, themeColors))
    }

    const connectParticles = () => {
      const maxDistance = 140

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y

          if (Math.abs(dx) > maxDistance || Math.abs(dy) > maxDistance) continue;

          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance

            ctx.strokeStyle = `rgba(33, 140, 99, ${opacity * 0.35})`
            ctx.lineWidth = 1.2

            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      // Hardware accelerated clear instead of painting a new linear gradient per frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesArray.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-[#050906] to-[#0e2b1d]"
      aria-hidden="true"
    />
  )
}
