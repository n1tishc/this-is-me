'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
}

/**
 * Interactive AI/ML backdrop: a drifting neural-network field of nodes and
 * synapse lines. Nodes near the cursor light up and wire together, and the
 * cursor gently repels nearby nodes. Sits behind the app window.
 */
export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

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

      // density scales with area, capped for perf
      const target = Math.min(90, Math.floor((width * height) / 16000))
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }))
      primary = readColor('--primary', '#08d9d6')
      accent = readColor('--accent', '#ff2e63')
    }

    const LINK_DIST = 132
    const MOUSE_DIST = 190

    function step() {
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        // cursor gently repels nodes
        if (mouse.active) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < MOUSE_DIST * MOUSE_DIST && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const force = (MOUSE_DIST - d) / MOUSE_DIST
            n.x += (dx / d) * force * 1.1
            n.y += (dy / d) * force * 1.1
          }
        }
      }

      // synapse lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.5
            ctx.strokeStyle = withAlpha(primary, alpha * 0.4)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // nodes + cursor-reactive glow / links to cursor
      for (const n of nodes) {
        let near = false
        if (mouse.active) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d = Math.hypot(dx, dy)
          if (d < MOUSE_DIST) {
            near = true
            const alpha = (1 - d / MOUSE_DIST) * 0.9
            ctx.strokeStyle = withAlpha(accent, alpha * 0.5)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = near ? withAlpha(accent, 0.95) : withAlpha(primary, 0.6)
        ctx.beginPath()
        ctx.arc(n.x, n.y, near ? 2.6 : 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // cursor core
      if (mouse.active) {
        ctx.fillStyle = withAlpha(accent, 0.9)
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    function withAlpha(hex: string, a: number) {
      // supports #rrggbb
      const h = hex.replace('#', '')
      if (h.length !== 6) return hex
      const r = parseInt(h.slice(0, 2), 16)
      const g = parseInt(h.slice(2, 4), 16)
      const b = parseInt(h.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${a})`
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
      // draw a single static frame
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
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full opacity-70"
    />
  )
}
