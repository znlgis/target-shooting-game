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
import { ComboDisplay } from '@/components/ComboDisplay'
import { LeaderboardDialog } from '@/components/LeaderboardDialog'
import { BombDisplay } from '@/components/BombDisplay'
import { ExplosionEffect } from '@/components/ExplosionEffect'
import { useKV } from '@github/spark/hooks'
import { 
  Play, 
  Pause, 
  ArrowClockwise, 
  Crosshair,
  Lightning,
  ListNumbers
} from '@phosphor-icons/react'
import { 
  Difficulty, 
  GameState, 
  Target as TargetType,
  TargetType as TType, 
  GameStats,
  LeaderboardEntry,
  Explosion
} from '@/types/game'
import { 
  DIFFICULTY_CONFIGS, 
  POINTS_PER_HIT, 
  POINTS_PER_MISS,
  BONUS_TARGET_POINTS,
  SPEED_TARGET_POINTS,
  COMBO_MULTIPLIER,
  COMBO_TIMEOUT,
  BONUS_TARGET_CHANCE,
  SPEED_TARGET_CHANCE,
  CONSECUTIVE_HITS_FOR_BOMB,
  BOMB_EXPLOSION_RADIUS,
  BOMB_POINTS
} from '@/lib/gameConfig'
import { soundEffects } from '@/lib/soundEffects'
import { toast } from 'sonner'

function App() {
  const [difficulty, setDifficulty] = useKV<Difficulty>('difficulty', 'medium')
  const [highScore, setHighScore] = useKV<number>('highScore', 0)
  const [leaderboard, setLeaderboard] = useKV<LeaderboardEntry[]>('leaderboard', [])
  const [gameState, setGameState] = useState<GameState>('idle')
  const [targets, setTargets] = useState<TargetType[]>([])
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    hits: 0,
    misses: 0,
    accuracy: 0,
    combo: 0,
    maxCombo: 0,
    consecutiveHits: 0,
    bombs: 0,
  })
  const [timeLeft, setTimeLeft] = useState(60)
  const [hitEffects, setHitEffects] = useState<Array<{ id: string; x: number; y: number }>>([])
  const [explosions, setExplosions] = useState<Explosion[]>([])
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showCombo, setShowCombo] = useState(false)
  
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const comboTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const config = DIFFICULTY_CONFIGS[difficulty || 'medium']

  const getTargetType = (): TType => {
    const rand = Math.random()
    if (rand < BONUS_TARGET_CHANCE) return 'bonus'
    if (rand < BONUS_TARGET_CHANCE + SPEED_TARGET_CHANCE) return 'speed'
    return 'normal'
  }

  const spawnTarget = useCallback(() => {
    if (!gameAreaRef.current || gameState !== 'playing') return

    const rect = gameAreaRef.current.getBoundingClientRect()
    const targetType = getTargetType()
    const sizeMultiplier = targetType === 'speed' ? 0.7 : 1
    const targetSize = config.targetSize * sizeMultiplier
    const margin = targetSize
    const x = margin + Math.random() * (rect.width - margin * 2)
    const y = margin + Math.random() * (rect.height - margin * 2)
    
    const angle = Math.random() * Math.PI * 2
    const speedMultiplier = targetType === 'speed' ? 2 : 1
    const speed = config.targetSpeed * speedMultiplier
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed

    const newTarget: TargetType = {
      id: `target-${Date.now()}-${Math.random()}`,
      x,
      y,
      vx,
      vy,
      size: targetSize,
      type: targetType,
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

  const handleTargetHit = useCallback((target: TargetType, x: number, y: number) => {
    if (target.type === 'speed' && gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect()
      const margin = target.size
      const newX = margin + Math.random() * (rect.width - margin * 2)
      const newY = margin + Math.random() * (rect.height - margin * 2)
      
      setTargets((prev) => 
        prev.map((t) => 
          t.id === target.id 
            ? { ...t, x: newX, y: newY } 
            : t
        )
      )
    } else {
      setTargets((prev) => prev.filter((t) => t.id !== target.id))
    }
    
    if (comboTimeoutRef.current) {
      clearTimeout(comboTimeoutRef.current)
    }

    setStats((prev) => {
      const newCombo = prev.combo + 1
      const newMaxCombo = Math.max(newCombo, prev.maxCombo)
      const newHits = prev.hits + 1
      const newConsecutiveHits = prev.consecutiveHits + 1
      const totalShots = newHits + prev.misses
      const accuracy = totalShots > 0 ? Math.round((newHits / totalShots) * 100) : 0
      
      let points = POINTS_PER_HIT
      if (target.type === 'bonus') {
        points = BONUS_TARGET_POINTS
      } else if (target.type === 'speed') {
        points = SPEED_TARGET_POINTS
      }

      const comboBonus = newCombo > 1 ? Math.floor(points * (COMBO_MULTIPLIER - 1) * (newCombo - 1)) : 0
      const totalPoints = points + comboBonus
      const newScore = prev.score + totalPoints

      let newBombs = prev.bombs
      if (newConsecutiveHits >= CONSECUTIVE_HITS_FOR_BOMB && newConsecutiveHits % CONSECUTIVE_HITS_FOR_BOMB === 0) {
        newBombs += 1
        soundEffects.playBombReward()
        toast.success(`💣 Bomb Earned! ${newConsecutiveHits} hits in a row!`, {
          duration: 2000,
          position: 'top-center',
        })
      }
      
      return {
        score: newScore,
        hits: newHits,
        misses: prev.misses,
        accuracy,
        combo: newCombo,
        maxCombo: newMaxCombo,
        consecutiveHits: newConsecutiveHits,
        bombs: newBombs,
      }
    })

    setHitEffects((prev) => [...prev, { id: `effect-${Date.now()}`, x, y }])
    setTimeout(() => {
      setHitEffects((prev) => prev.slice(1))
    }, 400)

    if (target.type === 'bonus') {
      soundEffects.playBonus()
      toast.success(`🌟 Bonus! +${BONUS_TARGET_POINTS} points!`, {
        duration: 1500,
        position: 'top-center',
      })
    } else if (target.type === 'speed') {
      soundEffects.playBonus()
      toast.success(`⚡ Speed Target! Position changed! +${SPEED_TARGET_POINTS} points!`, {
        duration: 1500,
        position: 'top-center',
      })
    } else {
      soundEffects.playHit()
    }

    setShowCombo(true)
    comboTimeoutRef.current = setTimeout(() => {
      setStats((prev) => ({ ...prev, combo: 0 }))
      setShowCombo(false)
    }, COMBO_TIMEOUT)

    setStats((prev) => {
      if (prev.combo > 1) {
        soundEffects.playCombo()
      }
      return prev
    })
  }, [gameAreaRef])

  const handleMiss = useCallback(() => {
    if (gameState !== 'playing') return

    if (comboTimeoutRef.current) {
      clearTimeout(comboTimeoutRef.current)
    }

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
        combo: 0,
        maxCombo: prev.maxCombo,
        consecutiveHits: 0,
        bombs: prev.bombs,
      }
    })

    soundEffects.playMiss()
    setShowCombo(false)
  }, [gameState])

  const startGame = useCallback(() => {
    setGameState('playing')
    setTargets([])
    setStats({ 
      score: 0, 
      hits: 0, 
      misses: 0, 
      accuracy: 0, 
      combo: 0, 
      maxCombo: 0,
      consecutiveHits: 0,
      bombs: 0,
    })
    setTimeLeft(config.gameDuration)
    setHitEffects([])
    setExplosions([])
    setShowCombo(false)
    if (comboTimeoutRef.current) {
      clearTimeout(comboTimeoutRef.current)
    }
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
    soundEffects.playGameOver()
    
    if (stats.score > (highScore || 0)) {
      setHighScore(stats.score)
      toast.success('🎉 New High Score!', { duration: 3000 })
    }

    const newEntry: LeaderboardEntry = {
      score: stats.score,
      accuracy: stats.accuracy,
      hits: stats.hits,
      difficulty: difficulty || 'medium',
      date: new Date().toISOString(),
      maxCombo: stats.maxCombo,
    }

    setLeaderboard((prevLeaderboard) => {
      const updated = [...(prevLeaderboard || []), newEntry]
      return updated.sort((a, b) => b.score - a.score).slice(0, 50)
    })

    if (comboTimeoutRef.current) {
      clearTimeout(comboTimeoutRef.current)
    }
    setShowCombo(false)
  }, [stats, highScore, setHighScore, difficulty, setLeaderboard])

  const restartGame = useCallback(() => {
    startGame()
  }, [startGame])

  const useBomb = useCallback(() => {
    if (gameState !== 'playing' || stats.bombs === 0 || !gameAreaRef.current) return

    const rect = gameAreaRef.current.getBoundingClientRect()
    const explosionX = Math.random() * rect.width
    const explosionY = Math.random() * rect.height

    const explosion: Explosion = {
      id: `explosion-${Date.now()}`,
      x: explosionX,
      y: explosionY,
      radius: BOMB_EXPLOSION_RADIUS,
    }

    setExplosions((prev) => [...prev, explosion])
    setTimeout(() => {
      setExplosions((prev) => prev.filter((e) => e.id !== explosion.id))
    }, 600)

    let hitCount = 0
    const targetsToRemove: string[] = []

    targets.forEach((target) => {
      const distance = Math.sqrt(
        Math.pow(target.x - explosionX, 2) + Math.pow(target.y - explosionY, 2)
      )
      if (distance <= BOMB_EXPLOSION_RADIUS) {
        targetsToRemove.push(target.id)
        hitCount++
      }
    })

    setTargets((prev) => prev.filter((t) => !targetsToRemove.includes(t.id)))

    setStats((prev) => ({
      ...prev,
      bombs: prev.bombs - 1,
      score: prev.score + (hitCount * BOMB_POINTS),
    }))

    soundEffects.playExplosion()
    
    if (hitCount > 0) {
      toast.success(`💥 Explosion! ${hitCount} targets destroyed! +${hitCount * BOMB_POINTS} points!`, {
        duration: 2000,
        position: 'top-center',
      })
    } else {
      toast.info('💣 Bomb used, but no targets hit!', {
        duration: 1500,
        position: 'top-center',
      })
    }
  }, [gameState, stats.bombs, targets])

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
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowLeaderboard(true)}
              className="flex items-center gap-2"
            >
              <ListNumbers size={20} weight="bold" />
              Leaderboard
            </Button>
            <Card className="p-3 bg-primary/20 border-secondary">
              <div className="text-center space-y-1">
                <p className="text-xs text-muted-foreground">High Score</p>
                <p className="font-mono text-2xl font-bold text-accent">{highScore}</p>
              </div>
            </Card>
          </div>
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
            <BombDisplay 
              bombCount={stats.bombs} 
              onUseBomb={useBomb}
              disabled={gameState !== 'playing'}
            />
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
                    type={target.type}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTargetHit(target, target.x, target.y)
                    }}
                  />
                ))}
              </AnimatePresence>

              {hitEffects.map((effect) => (
                <HitEffect key={effect.id} id={effect.id} x={effect.x} y={effect.y} />
              ))}

              {explosions.map((explosion) => (
                <ExplosionEffect 
                  key={explosion.id}
                  id={explosion.id}
                  x={explosion.x}
                  y={explosion.y}
                  radius={explosion.radius}
                />
              ))}

              <ComboDisplay combo={stats.combo} show={showCombo && gameState === 'playing'} />
            </motion.div>
          </div>
        </div>
      </div>

      <GameOverDialog
        open={gameState === 'gameover'}
        stats={stats}
        onRestart={restartGame}
      />

      <LeaderboardDialog
        open={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        entries={leaderboard || []}
      />
    </div>
  )
}

export default App
