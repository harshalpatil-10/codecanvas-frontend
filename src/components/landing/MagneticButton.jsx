import React, { useRef } from 'react'

// Subtle magnetic-pull micro-interaction: button nudges toward the cursor on hover.
export default function MagneticButton({ children, className = '', onClick, as: Component = 'button', ...props }) {
  const ref = useRef(null)

  function handleMouseMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`
  }

  function handleMouseLeave() {
    const el = ref.current
    if (el) el.style.transform = 'translate(0, 0)'
  }

  return (
    <Component
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)' }}
      {...props}
    >
      {children}
    </Component>
  )
}
