import { motion } from 'framer-motion'
import { Target as TargetIcon } from '@phosphor-icons/react'

interface TargetProps {
  x: number
  y: number
  size: number
  onClick: (e: React.MouseEvent) => void
}

export function Target({ x, y, size, onClick }: TargetProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileHover={{ scale: 1.1 }}
      className="absolute cursor-crosshair"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="drop-shadow-lg"
        >
          <circle cx="50" cy="50" r="48" fill="oklch(0.65 0.22 35)" stroke="oklch(0.98 0 0)" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="oklch(0.98 0 0)" strokeWidth="2" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="oklch(0.98 0 0)" strokeWidth="2" />
          <circle cx="50" cy="50" r="8" fill="oklch(0.98 0 0)" />
          <line x1="50" y1="0" x2="50" y2="20" stroke="oklch(0.98 0 0)" strokeWidth="2" />
          <line x1="50" y1="80" x2="50" y2="100" stroke="oklch(0.98 0 0)" strokeWidth="2" />
          <line x1="0" y1="50" x2="20" y2="50" stroke="oklch(0.98 0 0)" strokeWidth="2" />
          <line x1="80" y1="50" x2="100" y2="50" stroke="oklch(0.98 0 0)" strokeWidth="2" />
        </svg>
      </div>
    </motion.div>
  )
}
