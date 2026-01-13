export type Language = 'zh' | 'en'

export interface Translations {
  title: string
  subtitle: string
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
  leaderboard: string
  noRecordsYet: string
  timeLeft: string
  gameStarted: string
  language: string
  bombs: string
  bombUsedNoHit: string
  bonusTarget: (points: number) => string
  speedTarget: (points: number) => string
  bombsEarned: (count: number) => string
  bombsDestroyed: (count: number, points: number) => string
  newHighScore: string
}

export const translations: Record<Language, Translations> = {
  zh: {
    title: '打靶射击',
    subtitle: '测试你的反应速度和准确度',
    difficulty: '难度',
    easy: '简单',
    medium: '中等',
    hard: '困难',
    score: '分数',
    hits: '命中',
    misses: '未中',
    accuracy: '准确率',
    combo: '连击',
    maxCombo: '最高连击',
    startGame: '开始游戏',
    pause: '暂停',
    resume: '继续',
    restart: '重新开始',
    gameInProgress: '🎮 游戏进行中',
    gamePaused: '⏸️ 游戏已暂停',
    gameOver: '游戏结束！',
    yourFinalScore: '你的最终得分',
    playAgain: '再玩一次',
    readyToStart: '准备开始！',
    clickTargets: '点击移动的靶子来得分。',
    clickStartToBegin: '点击"开始游戏"按钮开始。',
    highScore: '最高分',
    leaderboard: '排行榜',
    noRecordsYet: '还没有游戏记录。开始游戏来查看你的成绩吧！',
    timeLeft: '剩余时间',
    gameStarted: '游戏开始！祝你好运！',
    language: '语言',
    bombs: '炸弹',
    bombUsedNoHit: '💣 炸弹已使用，但没有命中任何靶子',
    bonusTarget: (points: number) => `🎯 击中奖励靶子！+${points} 分`,
    speedTarget: (points: number) => `⚡ 击中快速靶子！+${points} 分`,
    bombsEarned: (count: number) => `🎁 连击 ${count} 次！获得一枚炸弹！`,
    bombsDestroyed: (count: number, points: number) => `💥 炸毁 ${count} 个靶子！+${points} 分`,
    newHighScore: '🎉 新纪录！恭喜你创造了新的最高分！',
  },
  en: {
    title: 'Target Shooting',
    subtitle: 'Test your reaction speed and accuracy',
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
    gameInProgress: '🎮 Game In Progress',
    gamePaused: '⏸️ Game Paused',
    gameOver: 'Game Over!',
    yourFinalScore: 'Your Final Score',
    playAgain: 'Play Again',
    readyToStart: 'Ready to Start!',
    clickTargets: 'Click on the moving targets to score points.',
    clickStartToBegin: 'Click "Start Game" to begin.',
    highScore: 'High Score',
    leaderboard: 'Leaderboard',
    noRecordsYet: 'No records yet. Start playing to see your scores!',
    timeLeft: 'Time Left',
    gameStarted: 'Game started! Good luck!',
    language: 'Language',
    bombs: 'Bombs',
    bombUsedNoHit: '💣 Bomb used, but no targets were hit',
    bonusTarget: (points: number) => `🎯 Bonus Target Hit! +${points} points`,
    speedTarget: (points: number) => `⚡ Speed Target Hit! +${points} points`,
    bombsEarned: (count: number) => `🎁 ${count} hits streak! Bomb earned!`,
    bombsDestroyed: (count: number, points: number) => `💥 ${count} targets destroyed! +${points} points`,
    newHighScore: '🎉 New High Score! Congratulations!',
  },
}
