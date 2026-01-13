import { motion } from 'framer-motion'

interface ExplosionEffectProps {
  id: string
  x: number
  y: number
  radius: number
}

export function ExplosionEffect({ id, x, y, radius }: ExplosionEffectProps) {
  return (
    <motion.div
      key={id}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 1, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="absolute pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative w-full h-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, oklch(0.70 0.25 35 / 0.8) 0%, oklch(0.60 0.22 25 / 0.4) 50%, transparent 100%)',
            boxShadow: '0 0 40px oklch(0.70 0.25 35)',
          }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5] }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute inset-0 rounded-full border-4"
          style={{
            borderColor: 'oklch(0.80 0.20 35)',
          }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 0.8, 1.8] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: 'oklch(0.85 0.15 35)',
          }}
        />
      </div>
    </motion.div>
  )
}
