'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  /** phase for a gentle brightness pulse */
  pulse: number
}

type Variant = 'backdrop' | 'card'

type Tuning = {
  /** area (px^2) per node — smaller means denser */
  areaPerNode: number
  maxNodes: number
  linkDist: number
  mouseDist: number
  baseRadius: number
  nearRadius: number
  lineAlpha: number
  nodeAlpha: number
  glow: number
  speed: number
}

const TUNING: Record<Variant, Tuning> = {
  // Behind the whole app — denser + more vivid so it actually reads.
  backdrop: {
    areaPerNode: 11000,
    maxNodes: 150,
    linkDist: 150,
    mouseDist: 210,
    baseRadius: 1.9,
    nearRadius: 3.2,
    lineAlpha: 0.72,
    nodeAlpha: 0.85,
    glow: 8,
    speed: 0.3,
  },
  // Inside the window card — subtle, low-opacity texture that stays out of the way.
  card: {
    areaPerNode: 20000,
    maxNodes: 64,
    linkDist: 128,
    mouseDist: 180,
    baseRadius: 1.5,
    nearRadius: 2.6,
    lineAlpha: 0.5,
    nodeAlpha: 0.6,
    glow: 6,
    speed: 0.22,
  },
}

/**
 * Interactive AI/ML node field: drifting neural-network nodes and synapse lines.
 * Nodes near the cursor light up (accent) and wire to it; the cursor gently
 * repels nearby nodes. Used both as a full-screen backdrop and as a subtle
 * living texture inside the app window card.
 */
export function NeuralBackground({ variant = 'backdrop' }: { variant?: Variant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const t = TUNING[variant]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: Node[] = []
    let raf = 0

    const mouse = { x: -9999, y: -9999, active: false }

    function readColor(varName: string, fallback: string) {
      const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
      return v || fallback
    }
    let primary = readColor('--primary', '#08d9d6')
    let accent = readColor('--accent', '#ff2e63')

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.min(t.maxNodes, Math.floor((width * height) / t.areaPerNode))
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * t.speed,
        vy: (Math.random() - 0.5) * t.speed,
        pulse: Math.random() * Math.PI * 2,
      }))
      primary = readColor('--primary', '#08d9d6')
      accent = readColor('--accent', '#ff2e63')
    }

    function withAlpha(hex: string, a: number) {
      const h = hex.replace('#', '')
      if (h.length !== 6) return hex
      const r = parseInt(h.slice(0, 2), 16)
      const g = parseInt(h.slice(2, 4), 16)
      const b = parseInt(h.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${a})`
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.02
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        if (mouse.active) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < t.mouseDist * t.mouseDist && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const force = (t.mouseDist - d) / t.mouseDist
            n.x += (dx / d) * force * 1.2
            n.y += (dy / d) * force * 1.2
          }
        }
      }

      // synapse lines (no glow — keeps it crisp and cheap)
      ctx.shadowBlur = 0
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < t.linkDist) {
            const alpha = (1 - d / t.linkDist) * t.lineAlpha
            ctx.strokeStyle = withAlpha(primary, alpha)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // cursor links
      if (mouse.active) {
        for (const n of nodes) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d = Math.hypot(dx, dy)
          if (d < t.mouseDist) {
            const alpha = (1 - d / t.mouseDist) * 0.7
            ctx.strokeStyle = withAlpha(accent, alpha)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      // nodes with a soft glow
      for (const n of nodes) {
        let near = false
        if (mouse.active) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y)
          near = d < t.mouseDist
        }
        const pulse = 0.75 + 0.25 * Math.sin(n.pulse)
        const color = near ? accent : primary
        ctx.shadowBlur = t.glow
        ctx.shadowColor = withAlpha(color, 0.9)
        ctx.fillStyle = withAlpha(color, (near ? 0.98 : t.nodeAlpha) * pulse)
        ctx.beginPath()
        ctx.arc(n.x, n.y, near ? t.nearRadius : t.baseRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      // cursor core
      if (mouse.active) {
        ctx.shadowBlur = t.glow + 4
        ctx.shadowColor = withAlpha(accent, 0.9)
        ctx.fillStyle = withAlpha(accent, 0.95)
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 3.2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(step)
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    function onLeave() {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onMove)
    document.addEventListener('pointerleave', onLeave)

    if (reduced) {
      step()
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={
        variant === 'card'
          ? 'pointer-events-none absolute inset-0 z-0 h-full w-full opacity-55'
          : 'pointer-events-none fixed inset-0 h-full w-full opacity-90'
      }
    />
  )
}
