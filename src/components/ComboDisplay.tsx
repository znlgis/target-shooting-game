import { motion, AnimatePresence } from 'framer-motion'
import { Fire } from '@phosphor-icons/react'

interface ComboDisplayProps {
  combo: number
  show: boolean
}

export function ComboDisplay({ combo, show }: ComboDisplayProps) {
  if (combo < 2 || !show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: -20 }}
        className="absolute top-4 right-4 z-10 pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-accent/90 to-accent/70 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-accent-foreground shadow-lg"
        >
          <Fire size={28} weight="fill" className="text-accent-foreground" />
          <div className="font-mono text-2xl font-bold text-accent-foreground">
            {combo}x COMBO!
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
