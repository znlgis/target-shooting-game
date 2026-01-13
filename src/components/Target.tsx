import { motion } from 'framer-motion'
import { TargetType } from '@/types/game'

interface TargetProps {
  x: number
  y: number
  size: number
  type: TargetType
  onClick: (e: React.MouseEvent) => void
}

export function Target({ x, y, size, type, onClick }: TargetProps) {
  const getTargetColors = () => {
    switch (type) {
      case 'bonus':
        return {
          fill: 'oklch(0.75 0.20 130)',
          stroke: 'oklch(0.95 0.01 130)',
          glow: 'drop-shadow(0 0 8px oklch(0.75 0.20 130))',
        }
      case 'speed':
        return {
          fill: 'oklch(0.70 0.25 300)',
          stroke: 'oklch(0.95 0.01 300)',
          glow: 'drop-shadow(0 0 8px oklch(0.70 0.25 300))',
        }
      default:
        return {
          fill: 'oklch(0.65 0.22 35)',
          stroke: 'oklch(0.98 0 0)',
          glow: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
        }
    }
  }

  const colors = getTargetColors()
  const pulseAnimation = type !== 'normal' ? { scale: [1, 1.1, 1] } : {}
  const pulseTransition = type !== 'normal' ? { duration: 0.8, repeat: Infinity } : {}

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1, ...pulseAnimation }}
      exit={{ scale: 0 }}
      whileHover={{ scale: 1.15 }}
      transition={pulseTransition}
      className="absolute cursor-crosshair"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)',
        filter: colors.glow,
      }}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="48" fill={colors.fill} stroke={colors.stroke} strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke={colors.stroke} strokeWidth="2" />
          <circle cx="50" cy="50" r="20" fill="none" stroke={colors.stroke} strokeWidth="2" />
          <circle cx="50" cy="50" r="8" fill={colors.stroke} />
          <line x1="50" y1="0" x2="50" y2="20" stroke={colors.stroke} strokeWidth="2" />
          <line x1="50" y1="80" x2="50" y2="100" stroke={colors.stroke} strokeWidth="2" />
          <line x1="0" y1="50" x2="20" y2="50" stroke={colors.stroke} strokeWidth="2" />
          <line x1="80" y1="50" x2="100" y2="50" stroke={colors.stroke} strokeWidth="2" />
          {type === 'bonus' && (
            <text x="50" y="55" textAnchor="middle" fontSize="20" fontWeight="bold" fill={colors.stroke}>★</text>
          )}
          {type === 'speed' && (
            <text x="50" y="58" textAnchor="middle" fontSize="24" fontWeight="bold" fill={colors.stroke}>⚡</text>
          )}
        </svg>
      </div>
    </motion.div>
  )
}
