import { Difficulty, DifficultyConfig } from '@/types/game'

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    spawnInterval: 1500,
    targetSpeed: 1.5,
    targetSize: 80,
    gameDuration: 60,
  },
  medium: {
    spawnInterval: 1000,
    targetSpeed: 2.5,
    targetSize: 60,
    gameDuration: 60,
  },
  hard: {
    spawnInterval: 700,
    targetSpeed: 4,
    targetSize: 45,
    gameDuration: 60,
  },
}

export const POINTS_PER_HIT = 100
export const POINTS_PER_MISS = -10
