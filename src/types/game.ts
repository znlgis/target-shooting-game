export type Difficulty = 'easy' | 'medium' | 'hard'

export type GameState = 'idle' | 'playing' | 'paused' | 'gameover'

export interface Target {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export interface GameStats {
  score: number
  hits: number
  misses: number
  accuracy: number
}

export interface DifficultyConfig {
  spawnInterval: number
  targetSpeed: number
  targetSize: number
  gameDuration: number
}
