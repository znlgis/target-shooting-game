import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Target } from '@/components/Target'
import { HitEffect } from '@/components/HitEffect'
import { StatsDisplay } from '@/components/StatsDisplay'
import { TimerDisplay } from '@/components/TimerDisplay'
import { GameOverDialog } from '@/components/GameOverDialog'
import { useKV } from '@github/spark/hooks'
import { 
  Play, 
  Pause, 
  ArrowClockwise, 
  Crosshair,
  Lightning
} from '@phosphor-icons/react'
import { 
  Difficulty, 
  GameState, 
  Target as TargetType, 
  GameStats 
} from '@/types/game'
import { 
  DIFFICULTY_CONFIGS, 
  POINTS_PER_HIT, 
  POINTS_PER_MISS 
} from '@/lib/gameConfig'
import { toast } from 'sonner'

function App() {
  const [difficulty, setDifficulty, deleteDifficulty] = useKV<Difficulty>('difficulty', 'medium')
  const [highScore, setHighScore, deleteHighScore] = useKV<number>('highScore', 0)
  const [gameState, setGameState] = useState<GameState>('idle')
  const [targets, setTargets] = useState<TargetType[]>([])
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    hits: 0,
    misses: 0,
    accuracy: 0,
  })
  const [timeLeft, setTimeLeft] = useState(60)
  const [hitEffects, setHitEffects] = useState<Array<{ id: string; x: number; y: number }>>([])
  
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const animationFrameRef = useRef<number | undefined>(undefined)

  const config = DIFFICULTY_CONFIGS[difficulty || 'medium']

  const spawnTarget = useCallback(() => {
    if (!gameAreaRef.current || gameState !== 'playing') return

    const rect = gameAreaRef.current.getBoundingClientRect()
    const margin = config.targetSize
    const x = margin + Math.random() * (rect.width - margin * 2)
    const y = margin + Math.random() * (rect.height - margin * 2)
    
    const angle = Math.random() * Math.PI * 2
    const speed = config.targetSpeed
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed

    const newTarget: TargetType = {
      id: `target-${Date.now()}-${Math.random()}`,
      x,
      y,
      vx,
      vy,
      size: config.targetSize,
    }

    setTargets((prev) => [...prev, newTarget])
  }, [config, gameState])

  const updateTargets = useCallback(() => {
    if (!gameAreaRef.current || gameState !== 'playing') return

    setTargets((prevTargets) => {
      const rect = gameAreaRef.current!.getBoundingClientRect()
      
      return prevTargets.map((target) => {
        let { x, y, vx, vy } = target
        
        x += vx
        y += vy

        const radius = target.size / 2

        if (x - radius <= 0 || x + radius >= rect.width) {
          vx = -vx
          x = Math.max(radius, Math.min(rect.width - radius, x))
        }
        if (y - radius <= 0 || y + radius >= rect.height) {
          vy = -vy
          y = Math.max(radius, Math.min(rect.height - radius, y))
        }

        return { ...target, x, y, vx, vy }
      })
    })

    animationFrameRef.current = requestAnimationFrame(updateTargets)
  }, [gameState])

  const handleTargetHit = useCallback((targetId: string, x: number, y: number) => {
    setTargets((prev) => prev.filter((t) => t.id !== targetId))
    
    setStats((prev) => {
      const newHits = prev.hits + 1
      const totalShots = newHits + prev.misses
      const accuracy = totalShots > 0 ? Math.round((newHits / totalShots) * 100) : 0
      const newScore = prev.score + POINTS_PER_HIT
      
      return {
        score: newScore,
        hits: newHits,
        misses: prev.misses,
        accuracy,
      }
    })

    setHitEffects((prev) => [...prev, { id: `effect-${Date.now()}`, x, y }])
    setTimeout(() => {
      setHitEffects((prev) => prev.slice(1))
    }, 400)

    toast.success(`+${POINTS_PER_HIT} points!`, {
      duration: 1000,
      position: 'top-center',
    })
  }, [])

  const handleMiss = useCallback(() => {
    if (gameState !== 'playing') return

    setStats((prev) => {
      const newMisses = prev.misses + 1
      const totalShots = prev.hits + newMisses
      const accuracy = totalShots > 0 ? Math.round((prev.hits / totalShots) * 100) : 0
      const newScore = Math.max(0, prev.score + POINTS_PER_MISS)
      
      return {
        score: newScore,
        hits: prev.hits,
        misses: newMisses,
        accuracy,
      }
    })
  }, [gameState])

  const startGame = useCallback(() => {
    setGameState('playing')
    setTargets([])
    setStats({ score: 0, hits: 0, misses: 0, accuracy: 0 })
    setTimeLeft(config.gameDuration)
    setHitEffects([])
    toast.success('Game started! Good luck!', { duration: 2000 })
  }, [config])

  const pauseGame = useCallback(() => {
    setGameState('paused')
    toast.info('Game paused', { duration: 1000 })
  }, [])

  const resumeGame = useCallback(() => {
    setGameState('playing')
    toast.success('Game resumed', { duration: 1000 })
  }, [])

  const endGame = useCallback(() => {
    setGameState('gameover')
    if (stats.score > (highScore || 0)) {
      setHighScore(stats.score)
      toast.success('🎉 New High Score!', { duration: 3000 })
    }
  }, [stats.score, highScore, setHighScore])

  const restartGame = useCallback(() => {
    startGame()
  }, [startGame])

  useEffect(() => {
    if (gameState === 'playing') {
      spawnIntervalRef.current = setInterval(spawnTarget, config.spawnInterval)
      animationFrameRef.current = requestAnimationFrame(updateTargets)
      
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current)
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [gameState, spawnTarget, updateTargets, config])

  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') {
      endGame()
    }
  }, [timeLeft, gameState, endGame])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
              <Crosshair size={40} className="text-accent" weight="bold" />
              Target Shooter
            </h1>
            <p className="text-muted-foreground">Test your aim and reaction time</p>
          </div>
          
          <Card className="p-3 bg-primary/20 border-secondary">
            <div className="text-center space-y-1">
              <p className="text-xs text-muted-foreground">High Score</p>
              <p className="font-mono text-2xl font-bold text-accent">{highScore}</p>
            </div>
          </Card>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Lightning size={18} className="text-accent" weight="fill" />
                  Difficulty
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
                    <Button
                      key={level}
                      variant={difficulty === level ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setDifficulty(level)}
                      disabled={gameState === 'playing'}
                      className={difficulty === level ? 'bg-secondary text-secondary-foreground' : ''}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            <TimerDisplay timeLeft={timeLeft} totalTime={config.gameDuration} />
            <StatsDisplay stats={stats} />

            <div className="flex flex-col gap-2">
              {gameState === 'idle' && (
                <Button 
                  onClick={startGame}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  size="lg"
                >
                  <Play size={20} weight="fill" />
                  Start Game
                </Button>
              )}
              
              {gameState === 'playing' && (
                <Button 
                  onClick={pauseGame}
                  variant="outline"
                  className="w-full font-semibold"
                  size="lg"
                >
                  <Pause size={20} weight="fill" />
                  Pause
                </Button>
              )}
              
              {gameState === 'paused' && (
                <>
                  <Button 
                    onClick={resumeGame}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                    size="lg"
                  >
                    <Play size={20} weight="fill" />
                    Resume
                  </Button>
                  <Button 
                    onClick={restartGame}
                    variant="outline"
                    className="w-full font-semibold"
                  >
                    <ArrowClockwise size={20} weight="bold" />
                    Restart
                  </Button>
                </>
              )}
            </div>

            {gameState !== 'idle' && (
              <Badge 
                variant="outline" 
                className="w-full justify-center py-2 text-sm"
              >
                {gameState === 'playing' && '🎯 Game Active'}
                {gameState === 'paused' && '⏸️ Paused'}
              </Badge>
            )}
          </div>

          <div className="lg:col-span-3">
            <motion.div
              ref={gameAreaRef}
              className="relative w-full h-[600px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border-2 border-border overflow-hidden cursor-crosshair"
              onClick={handleMiss}
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 49px, oklch(0.30 0.04 255 / 0.3) 49px, oklch(0.30 0.04 255 / 0.3) 50px),
                  repeating-linear-gradient(90deg, transparent, transparent 49px, oklch(0.30 0.04 255 / 0.3) 49px, oklch(0.30 0.04 255 / 0.3) 50px)
                `,
              }}
            >
              {gameState === 'idle' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8 bg-card/80 backdrop-blur-sm rounded-lg border-2 border-border">
                    <Crosshair size={64} className="text-accent mx-auto" weight="bold" />
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Ready to Play?</h2>
                      <p className="text-muted-foreground">
                        Click the targets as they appear and move around.
                        <br />
                        Click Start Game to begin!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {gameState === 'paused' && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-20">
                  <div className="text-center space-y-4 p-8 bg-card border-2 border-border rounded-lg">
                    <Pause size={64} className="text-secondary mx-auto" weight="fill" />
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Game Paused</h2>
                      <p className="text-muted-foreground">Click Resume to continue</p>
                    </div>
                  </div>
                </div>
              )}

              <AnimatePresence>
                {targets.map((target) => (
                  <Target
                    key={target.id}
                    x={target.x}
                    y={target.y}
                    size={target.size}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTargetHit(target.id, target.x, target.y)
                    }}
                  />
                ))}
              </AnimatePresence>

              {hitEffects.map((effect) => (
                <HitEffect key={effect.id} id={effect.id} x={effect.x} y={effect.y} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <GameOverDialog
        open={gameState === 'gameover'}
        stats={stats}
        onRestart={restartGame}
      />
    </div>
  )
}

export default App
