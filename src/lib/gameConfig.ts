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
export const BONUS_TARGET_POINTS = 300
export const SPEED_TARGET_POINTS = 200

export const COMBO_MULTIPLIER = 1.2
export const COMBO_TIMEOUT = 2000

export const BONUS_TARGET_CHANCE = 0.15
export const SPEED_TARGET_CHANCE = 0.10

export const CONSECUTIVE_HITS_FOR_BOMB = 3
export const BOMB_EXPLOSION_RADIUS = 150
export const BOMB_POINTS = 50
