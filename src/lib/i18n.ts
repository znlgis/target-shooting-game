export type Language = 'zh' | 'en'

export interface Translations {
  title: string
  subtitle: string
  leaderboard: string
  difficulty: string
  easy: string
  medium: string
  hard: string
  score: string
  hits: string
  misses: string
  accuracy: string
  combo: string
  maxCombo: string
  startGame: string
  pause: string
  resume: string
  restart: string
  gameInProgress: string
  gamePaused: string
  gameOver: string
  yourFinalScore: string
  playAgain: string
  readyToStart: string
  clickTargets: string
  clickStartToBegin: string
  highScore: string
  noRecordsYet: string
  timeLeft: string
  bombs: string
  bombsEarned: (count: number) => string
  bombUsedNoHit: string
  bombsDestroyed: (count: number, points: number) => string
  bonusTarget: (points: number) => string
  speedTarget: (points: number) => string
  gameStarted: string
  newHighScore: string
  language: string
}

export const translations: Record<Language, Translations> = {
  zh: {
    title: '打靶射击',
    subtitle: '测试你的反应速度和准确度',
    leaderboard: '排行榜',
    difficulty: '难度',
    easy: '简单',
    medium: '中等',
    hard: '困难',
    score: '得分',
    hits: '命中',
    misses: '失误',
    accuracy: '准度',
    combo: '连击',
    maxCombo: '最高连击',
    startGame: '开始游戏',
    pause: '暂停',
    resume: '继续',
    restart: '重新开始',
    gameInProgress: '🎯 游戏进行中',
    gamePaused: '⏸️ 游戏已暂停',
    gameOver: '游戏结束！',
    yourFinalScore: '你的最终得分',
    playAgain: '再来一局',
    readyToStart: '准备开始！',
    clickTargets: '点击移动的靶子进行射击。',
    clickStartToBegin: '点击"开始游戏"按钮开始。',
    highScore: '最高分',
    noRecordsYet: '还没有游戏记录。开始游戏来查看你的成绩吧！',
    timeLeft: '剩余时间',
    bombs: '炸弹',
    bombsEarned: (count: number) => `💣 获得炸弹！连击 ${count} 次！`,
    bombUsedNoHit: '💣 炸弹未命中任何目标',
    bombsDestroyed: (count: number, points: number) => `💥 炸毁 ${count} 个目标！+${points} 分`,
    bonusTarget: (points: number) => `🌟 击中奖励目标！+${points} 分`,
    speedTarget: (points: number) => `⚡ 击中快速目标！+${points} 分`,
    gameStarted: '游戏开始！祝你好运！',
    newHighScore: '🎉 新纪录！',
    language: '语言',
  },
  en: {
    title: 'Target Shooting',
    subtitle: 'Test your aim and reflexes',
    leaderboard: 'Leaderboard',
    difficulty: 'Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    score: 'Score',
    hits: 'Hits',
    misses: 'Misses',
    accuracy: 'Accuracy',
    combo: 'Combo',
    maxCombo: 'Max Combo',
    startGame: 'Start Game',
    pause: 'Pause',
    resume: 'Resume',
    restart: 'Restart',
    gameInProgress: '🎯 Game In Progress',
    gamePaused: '⏸️ Game Paused',
    gameOver: 'Game Over!',
    yourFinalScore: 'Your Final Score',
    playAgain: 'Play Again',
    readyToStart: 'Ready to Start!',
    clickTargets: 'Click on moving targets to shoot.',
    clickStartToBegin: 'Click "Start Game" to begin.',
    highScore: 'High Score',
    noRecordsYet: 'No records yet. Start playing to see your scores!',
    timeLeft: 'Time Left',
    bombs: 'Bombs',
    bombsEarned: (count: number) => `💣 Bomb Earned! ${count} hit streak!`,
    bombUsedNoHit: '💣 Bomb missed all targets',
    bombsDestroyed: (count: number, points: number) => `💥 Destroyed ${count} targets! +${points} pts`,
    bonusTarget: (points: number) => `🌟 Bonus Target Hit! +${points} pts`,
    speedTarget: (points: number) => `⚡ Speed Target Hit! +${points} pts`,
    gameStarted: 'Game started! Good luck!',
    newHighScore: '🎉 New High Score!',
    language: 'Language',
  },
}
