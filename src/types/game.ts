export type Difficulty = 'easy' | 'medium' | 'hard'

export type GameState = 'idle' | 'playing' | 'paused' | 'gameover'

export type TargetType = 'normal' | 'bonus' | 'speed'

export interface Target {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  type: TargetType
}

export interface GameStats {
  score: number
  hits: number
  misses: number
  accuracy: number
  combo: number
  maxCombo: number
}

export interface DifficultyConfig {
  spawnInterval: number
  targetSpeed: number
  targetSize: number
  gameDuration: number
}

export interface LeaderboardEntry {
  score: number
  accuracy: number
  hits: number
  difficulty: Difficulty
  date: string
  maxCombo: number
}
