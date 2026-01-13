import { motion, AnimatePresence } from 'framer-motion'

interface HitEffectProps {
  x: number
  y: number
  id: string
}

export function HitEffect({ x, y, id }: HitEffectProps) {
  return (
    <AnimatePresence>
      <motion.div
        key={id}
        className="absolute pointer-events-none"
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-secondary rounded-full"
              initial={{ x: 0, y: 0 }}
              animate={{
                x: Math.cos((i * Math.PI) / 4) * 50,
                y: Math.sin((i * Math.PI) / 4) * 50,
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
          <motion.div
            className="w-12 h-12 border-4 border-accent rounded-full"
            style={{ transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0.5 }}
            animate={{ scale: 2 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
