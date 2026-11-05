import React, { useEffect, useRef, useState } from 'react'

export type DogState =
  | 'idle-sit'
  | 'wag'
  | 'sleep'
  | 'stretch'
  | 'walk'
  | 'run'
  | 'turn'
  | 'bark'
  | 'perk'
  | 'sniff-hop'

interface PawPrint {
  x: number
  y: number
  angle: number
  opacity: number
  scale: number
  born: number
  isLeft: boolean
}

interface DogCursorProps {
  enabled: boolean
}

export const DogCursor: React.FC<DogCursorProps> = ({ enabled }) => {
  const [dogVisible, setDogVisible] = useState(true)
  const [barking, setBarking] = useState(false)
  const [sleeping, setSleeping] = useState(false)
  const [facingLeft, setFacingLeft] = useState(false)
  const [currentState, setCurrentState] = useState<DogState>('idle-sit')

  // Coordinates
  const posRef = useRef({ x: 120, y: 180 })
  const targetRef = useRef({ x: 120, y: 180 })
  const lastMousePos = useRef({ x: 120, y: 180 })
  const lastMoveTime = useRef(Date.now())
  const stateRef = useRef<DogState>('idle-sit')
  const pawPrintsRef = useRef<PawPrint[]>([])
  const leftPawNext = useRef(true)
  const walkFrameIndex = useRef(0)
  const walkAccumulator = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Canvas context ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    stateRef.current = currentState
  }, [currentState])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDogVisible(false)
      return
    }

    const canvas = document.getElementById('paw-canvas') as HTMLCanvasElement
    if (canvas) {
      canvasRef.current = canvas
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const handleResize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Mouse & interaction listener
  useEffect(() => {
    if (!enabled) return

    const onMouseMove = (e: MouseEvent) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      lastMoveTime.current = Date.now()

      // Target is 32px short of the cursor
      const dx = e.clientX - posRef.current.x
      const dy = e.clientY - posRef.current.y
      const dist = Math.hypot(dx, dy)

      if (dist > 36) {
        const offset = 32
        const angle = Math.atan2(dy, dx)
        targetRef.current = {
          x: e.clientX - Math.cos(angle) * offset,
          y: e.clientY - Math.sin(angle) * offset,
        }
      }

      if (stateRef.current === 'sleep') {
        setCurrentState('stretch')
      }
    }

    const onClick = () => {
      setBarking(true)
      setCurrentState('bark')
      setTimeout(() => {
        setBarking(false)
        setCurrentState('idle-sit')
      }, 700)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('click', onClick)

    const onDogReact = (e: Event) => {
      const custom = e as CustomEvent<{ action: DogState }>
      if (custom.detail?.action) {
        setCurrentState(custom.detail.action)
        if (custom.detail.action === 'sniff-hop') {
          setTimeout(() => setCurrentState('idle-sit'), 1200)
        }
      }
    }
    window.addEventListener('dog-react', onDogReact)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('dog-react', onDogReact)
    }
  }, [enabled])

  // Main 60/144Hz rAF loop with delta time
  useEffect(() => {
    if (!enabled) return

    let lastTime = performance.now()
    let animId: number

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      const isTouch = window.matchMedia('(pointer: coarse)').matches
      const now = Date.now()

      // Touch wandering logic
      if (isTouch) {
        if (Math.hypot(targetRef.current.x - posRef.current.x, targetRef.current.y - posRef.current.y) < 20) {
          targetRef.current = {
            x: Math.random() * (window.innerWidth - 80) + 40,
            y: window.innerHeight - 50,
          }
        }
      }

      const dx = targetRef.current.x - posRef.current.x
      const dy = targetRef.current.y - posRef.current.y
      const dist = Math.hypot(dx, dy)
      const angle = Math.atan2(dy, dx)

      if (Math.abs(dx) > 4) {
        setFacingLeft(dx < 0)
      }

      const idleTime = now - lastMoveTime.current

      if (stateRef.current !== 'bark' && stateRef.current !== 'sniff-hop') {
        if (dist > 180) {
          setCurrentState('run')
          setSleeping(false)
        } else if (dist > 36) {
          setCurrentState('walk')
          setSleeping(false)
        } else {
          if (idleTime > 8000) {
            setCurrentState('sleep')
            setSleeping(true)
          } else if (idleTime > 1500) {
            setCurrentState('wag')
            setSleeping(false)
          } else {
            setCurrentState('idle-sit')
            setSleeping(false)
          }
        }
      }

      if (stateRef.current === 'walk' || stateRef.current === 'run') {
        const isRunning = stateRef.current === 'run'
        const maxSpeed = isRunning ? 380 : 190
        const strideCycle = isRunning ? 0.14 : 0.26

        const moveDist = Math.min(dist, maxSpeed * dt)
        posRef.current.x += Math.cos(angle) * moveDist
        posRef.current.y += Math.sin(angle) * moveDist

        walkAccumulator.current += dt
        if (walkAccumulator.current >= strideCycle / 4) {
          walkAccumulator.current = 0
          walkFrameIndex.current = (walkFrameIndex.current + 1) % 4

          if (walkFrameIndex.current === 0 || walkFrameIndex.current === 2) {
            stampPaw(angle, isRunning)
          }
        }
      }

      if (containerRef.current) {
        const bob = (stateRef.current === 'walk' || stateRef.current === 'run')
          ? (walkFrameIndex.current % 2 === 0 ? -2 : 0)
          : 0
        containerRef.current.style.transform = `translate3d(${posRef.current.x - 20}px, ${posRef.current.y - 18 + bob}px, 0)`
      }

      drawPawCanvas(now)

      animId = requestAnimationFrame(render)
    }

    const stampPaw = (angle: number, isRunning: boolean) => {
      const isLeft = leftPawNext.current
      leftPawNext.current = !leftPawNext.current

      const perpAngle = angle + (isLeft ? -Math.PI / 2 : Math.PI / 2)
      const offsetDist = isRunning ? 7 : 5

      const pawX = posRef.current.x + Math.cos(perpAngle) * offsetDist
      const pawY = posRef.current.y + 12 + Math.sin(perpAngle) * offsetDist

      pawPrintsRef.current.push({
        x: pawX,
        y: pawY,
        angle: angle,
        opacity: isRunning ? 0.4 : 0.5, // 50% opacity per prompt
        scale: isRunning ? 1.05 : 0.95,
        born: Date.now(),
        isLeft,
      })

      if (pawPrintsRef.current.length > 40) {
        pawPrintsRef.current.shift()
      }
    }

    const drawPawCanvas = (now: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pawPrintsRef.current = pawPrintsRef.current.filter((print) => {
        const age = (now - print.born) / 1000
        if (age > 2.2) return false

        const alpha = Math.max(0, print.opacity * (1 - age / 2.2))
        const scale = print.scale * (1 - (age / 2.2) * 0.2)

        ctx.save()
        ctx.translate(print.x, print.y)
        ctx.rotate(print.angle + Math.PI / 2)
        ctx.scale(scale, scale)

        // Deep terracotta paw prints (#B4441F) at ~50% opacity
        ctx.fillStyle = `rgba(180, 68, 31, ${alpha})`

        // Main pad
        ctx.beginPath()
        ctx.ellipse(0, 0, 3.2, 2.5, 0, 0, Math.PI * 2)
        ctx.fill()

        // 3 toe dots
        ctx.beginPath()
        ctx.arc(-2.4, -3.4, 1.1, 0, Math.PI * 2)
        ctx.arc(0, -4.2, 1.1, 0, Math.PI * 2)
        ctx.arc(2.4, -3.4, 1.1, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
        return true
      })
    }

    animId = requestAnimationFrame(render)

    return () => cancelAnimationFrame(animId)
  }, [enabled])

  if (!enabled || !dogVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 pointer-events-none z-[80] select-none will-change-transform"
      style={{
        transform: `translate3d(${posRef.current.x - 20}px, ${posRef.current.y - 18}px, 0)`,
      }}
    >
      <div
        className={`relative transition-transform duration-75 ${
          facingLeft ? 'scale-x-[-1]' : 'scale-x-[1]'
        }`}
      >
        {/* Pixel Art SVG Dog (40x34px) */}
        <svg
          width="40"
          height="34"
          viewBox="0 0 20 17"
          className="overflow-visible"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Shadow */}
          <ellipse cx="10" cy="16" rx="6.5" ry="1.5" fill="rgba(31, 26, 20, 0.22)" />

          {/* Body (linen #EAE2D1) */}
          <rect x="5" y="7" width="9" height="6" fill="#ECE6D6" rx="1" />

          {/* Darker Patch (#A39B8B) */}
          <rect x="7" y="8" width="3" height="3" fill="#A39B8B" />

          {/* Head & Snout */}
          <rect x="11" y="4" width="6" height="5" fill="#ECE6D6" rx="1" />
          <rect x="15" y="6" width="3" height="3" fill="#DFD6C3" />
          <rect x="17" y="6" width="1.5" height="1.5" fill="#1F1A14" />
          <rect x="13.5" y="5.5" width="1" height="1" fill="#1F1A14" />

          {/* Round Ears */}
          {currentState === 'perk' ? (
            <rect x="11" y="1" width="2.5" height="3.5" fill="#A39B8B" rx="1" />
          ) : (
            <rect x="10.5" y="2.5" width="2.5" height="3" fill="#A39B8B" rx="1" />
          )}

          {/* Primary Accent Collar (Deep Terracotta #B4441F) */}
          <rect x="11" y="7.5" width="2" height="1" fill="#B4441F" />

          {/* Legs & Animated Paws */}
          {currentState === 'walk' || currentState === 'run' ? (
            <>
              <rect
                x={walkFrameIndex.current === 0 ? '12.5' : '14'}
                y="12"
                width="1.8"
                height="3.5"
                fill="#ECE6D6"
              />
              <rect
                x={walkFrameIndex.current === 2 ? '5' : '6.5'}
                y="12"
                width="1.8"
                height="3.5"
                fill="#ECE6D6"
              />
            </>
          ) : currentState === 'sleep' ? (
            <rect x="5" y="12" width="8" height="2" fill="#ECE6D6" />
          ) : (
            <>
              <rect x="6" y="12" width="2" height="3" fill="#ECE6D6" />
              <rect x="12" y="12" width="2" height="3" fill="#ECE6D6" />
            </>
          )}

          {/* Tail */}
          {currentState === 'wag' ? (
            <path
              d="M 5 8 Q 2 6 3 4"
              stroke="#ECE6D6"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
            />
          ) : currentState === 'sleep' ? (
            <path d="M 5 10 Q 3 11 2 12" stroke="#ECE6D6" strokeWidth="1.5" fill="none" />
          ) : (
            <path d="M 5 8 Q 2 5 3 3" stroke="#ECE6D6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          )}
        </svg>

        {/* Bark Bubble */}
        {barking && (
          <div className="absolute -top-7 -right-6 px-2 py-0.5 rounded bg-[#1F1A14] text-[#EAE2D1] font-mono text-[9px] font-bold shadow-sm animate-bounce pointer-events-none">
            woof!
          </div>
        )}

        {/* Sleeping bubbles */}
        {sleeping && (
          <div className="absolute -top-6 -right-2 text-xs font-mono text-[#5E6B3A] font-bold animate-pulse pointer-events-none">
            z Z
          </div>
        )}
      </div>
    </div>
  )
}
