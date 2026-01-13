export type Language = 'zh' | 'en'

export interface Translations {
  title: string
  subtitle: string
  highScore: string
  leaderboard: string
  difficulty: string
  easy: string
  medium: string
  hard: string
  score: string
  hits: string
  misses: string
  accuracy: string
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
  noRecordsYet: string
  startPlayingToSeeScores: string
  timeLeft: string
  bombs: string
  bombsEarned: (count: number) => string
  bombsDestroyed: (count: number, points: number) => string
  bombUsedNoHit: string
  bonusTarget: (points: number) => string
  speedTarget: (points: number) => string
  rightClickToUseBomb: string
  gameStarted: string
  goodLuck: string
  newHighScore: string
  consecutiveHits: (count: number) => string
  language: string
}

export const translations: Record<Language, Translations> = {
  zh: {
    title: '打靶射击',
    subtitle: '测试你的瞄准和反应能力',
    highScore: '最高分',
    leaderboard: '排行榜',
    difficulty: '难度',
    easy: '简单',
    medium: '中等',
    hard: '困难',
    score: '得分',
    hits: '命中',
    misses: '未中',
    accuracy: '准度',
    maxCombo: '最佳连击',
    startGame: '开始游戏',
    pause: '暂停',
    resume: '继续',
    restart: '重新开始',
    gameInProgress: '🎯 游戏进行中',
    gamePaused: '⏸️ 已暂停',
    gameOver: '游戏结束！',
    yourFinalScore: '这是你的最终成绩',
    playAgain: '再来一局',
    readyToStart: '准备好开始了吗？',
    clickTargets: '点击移动的靶子进行射击。',
    clickStartToBegin: '点击"开始游戏"开始！',
    noRecordsYet: '还没有游戏记录。开始游戏来查看你的成绩吧！',
    startPlayingToSeeScores: '开始游戏来查看你的成绩吧！',
    timeLeft: '剩余时间',
    bombs: '炸弹',
    bombsEarned: (count) => `💣 获得炸弹！连续命中${count}次！`,
    bombsDestroyed: (count, points) => `💥 爆炸！摧毁了${count}个靶！+${points}分！`,
    bombUsedNoHit: '💣 炸弹已使用，但没有击中靶！',
    bonusTarget: (points) => `🌟 奖励！+${points}分！`,
    speedTarget: (points) => `⚡ 速度靶！位置改变！+${points}分！`,
    rightClickToUseBomb: '右键使用',
    gameStarted: '游戏开始！祝你好运！',
    goodLuck: '祝你好运！',
    newHighScore: '🎉 新纪录！',
    consecutiveHits: (count) => `连续命中${count}次`,
    language: '语言',
  },
  en: {
    title: 'Target Shooting',
    subtitle: 'Test your aim and reflexes',
    highScore: 'High Score',
    leaderboard: 'Leaderboard',
    difficulty: 'Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    score: 'Score',
    hits: 'Hits',
    misses: 'Misses',
    accuracy: 'Accuracy',
    maxCombo: 'Max Combo',
    startGame: 'Start Game',
    pause: 'Pause',
    resume: 'Resume',
    restart: 'Restart',
    gameInProgress: '🎯 Game In Progress',
    gamePaused: '⏸️ Paused',
    gameOver: 'Game Over!',
    yourFinalScore: 'Here is your final score',
    playAgain: 'Play Again',
    readyToStart: 'Ready to start?',
    clickTargets: 'Click on moving targets to shoot.',
    clickStartToBegin: 'Click "Start Game" to begin!',
    noRecordsYet: 'No game records yet. Start playing to see your scores!',
    startPlayingToSeeScores: 'Start playing to see your scores!',
    timeLeft: 'Time Left',
    bombs: 'Bombs',
    bombsEarned: (count) => `💣 Bomb Earned! ${count} consecutive hits!`,
    bombsDestroyed: (count, points) => `💥 Explosion! Destroyed ${count} target${count > 1 ? 's' : ''}! +${points} points!`,
    bombUsedNoHit: '💣 Bomb used, but no targets hit!',
    bonusTarget: (points) => `🌟 Bonus! +${points} points!`,
    speedTarget: (points) => `⚡ Speed Target! Position changed! +${points} points!`,
    rightClickToUseBomb: 'Right-click to use',
    gameStarted: 'Game started! Good luck!',
    goodLuck: 'Good luck!',
    newHighScore: '🎉 New High Score!',
    consecutiveHits: (count) => `${count} consecutive hits`,
    language: 'Language',
  },
}
