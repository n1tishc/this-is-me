'use client'

import { useEffect, useRef } from 'react'

type RGB = { r: number; g: number; b: number }

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  /** phase for a gentle brightness pulse */
  pulse: number
  /** vivid palette color for this node */
  c: RGB
}

/** A signal traveling along a synapse between two nodes — the "firing" effect. */
type Signal = {
  a: number
  b: number
  prog: number
  speed: number
  c: RGB
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
  maxSignals: number
  signalChance: number
}

const TUNING: Record<Variant, Tuning> = {
  // Behind the whole app — denser + more vivid so it actually reads.
  backdrop: {
    areaPerNode: 8800,
    maxNodes: 190,
    linkDist: 165,
    mouseDist: 220,
    baseRadius: 2,
    nearRadius: 3.6,
    lineAlpha: 0.8,
    nodeAlpha: 0.9,
    glow: 10,
    speed: 0.32,
    maxSignals: 26,
    signalChance: 0.9,
  },
  // Inside the window card — subtle, low-opacity texture that stays out of the way.
  card: {
    areaPerNode: 19000,
    maxNodes: 70,
    linkDist: 132,
    mouseDist: 190,
    baseRadius: 1.6,
    nearRadius: 2.8,
    lineAlpha: 0.58,
    nodeAlpha: 0.68,
    glow: 7,
    speed: 0.24,
    maxSignals: 10,
    signalChance: 0.5,
  },
}

/** Vivid, dark-friendly palette (cyan / pink / mint / warm highlight). */
const PALETTE: RGB[] = [
  { r: 63, g: 193, b: 201 }, // #3FC1C9 cyan
  { r: 252, g: 81, b: 133 }, // #FC5185 pink
  { r: 149, g: 225, b: 211 }, // #95E1D3 mint
  { r: 252, g: 227, b: 138 }, // #FCE38A warm
]
/** Cursor uses the hottest pink for a clear "you are here" focus. */
const CURSOR: RGB = { r: 252, g: 81, b: 133 }

function rgba({ r, g, b }: RGB, a: number) {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}
function blend(a: RGB, b: RGB): RGB {
  return { r: (a.r + b.r) >> 1, g: (a.g + b.g) >> 1, b: (a.b + b.b) >> 1 }
}

/**
 * Interactive AI/ML node field: drifting neural-network nodes wired by synapse
 * lines, with signal pulses traveling between them so the net looks like it is
 * firing. Nodes near the cursor brighten and wire to it; the cursor gently
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
    let signals: Signal[] = []
    let raf = 0

    const mouse = { x: -9999, y: -9999, active: false }

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
        c: PALETTE[(Math.random() * PALETTE.length) | 0],
      }))
      signals = []
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.025
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        if (mouse.active) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < t.mouseDist * t.mouseDist && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const force = (t.mouseDist - d) / t.mouseDist
            n.x += (dx / d) * force * 1.3
            n.y += (dy / d) * force * 1.3
          }
        }
      }

      // synapse lines — color blended between the two connected nodes
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
            ctx.strokeStyle = rgba(blend(a.c, b.c), alpha)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()

            // occasionally fire a signal down this synapse
            if (signals.length < t.maxSignals && Math.random() < 0.0016 * t.signalChance) {
              signals.push({ a: i, b: j, prog: 0, speed: 0.012 + Math.random() * 0.02, c: a.c })
            }
          }
        }
      }

      // traveling signal pulses
      ctx.shadowBlur = t.glow
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s]
        const a = nodes[sig.a]
        const b = nodes[sig.b]
        if (!a || !b) {
          signals.splice(s, 1)
          continue
        }
        sig.prog += sig.speed
        if (sig.prog >= 1) {
          signals.splice(s, 1)
          continue
        }
        const x = a.x + (b.x - a.x) * sig.prog
        const y = a.y + (b.y - a.y) * sig.prog
        const fade = Math.sin(sig.prog * Math.PI)
        ctx.shadowColor = rgba(sig.c, 0.95)
        ctx.fillStyle = rgba(sig.c, fade)
        ctx.beginPath()
        ctx.arc(x, y, 1.9, 0, Math.PI * 2)
        ctx.fill()
      }

      // cursor links
      ctx.shadowBlur = 0
      if (mouse.active) {
        for (const n of nodes) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d = Math.hypot(dx, dy)
          if (d < t.mouseDist) {
            const alpha = (1 - d / t.mouseDist) * 0.85
            // each cursor link takes on its node's own palette color
            ctx.strokeStyle = rgba(n.c, alpha)
            ctx.lineWidth = 1.1
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
        const pulse = 0.7 + 0.3 * Math.sin(n.pulse)
        // node keeps its own palette color; hovering just makes it brighter/glowier
        ctx.shadowBlur = near ? t.glow * 1.8 : t.glow
        ctx.shadowColor = rgba(n.c, 0.95)
        ctx.fillStyle = rgba(n.c, (near ? 1 : t.nodeAlpha) * pulse)
        ctx.beginPath()
        ctx.arc(n.x, n.y, near ? t.nearRadius : t.baseRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      // cursor core
      if (mouse.active) {
        ctx.shadowBlur = t.glow + 5
        ctx.shadowColor = rgba(CURSOR, 0.95)
        ctx.fillStyle = rgba(CURSOR, 0.98)
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 3.4, 0, Math.PI * 2)
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
          ? 'pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60'
          : 'pointer-events-none fixed inset-0 h-full w-full opacity-95'
      }
    />
  )
}
