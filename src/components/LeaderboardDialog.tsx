import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LeaderboardEntry } from '@/types/game'
import { Trophy, Medal, Target, Fire } from '@phosphor-icons/react'
import { Separator } from '@/components/ui/separator'

interface LeaderboardDialogProps {
  open: boolean
  onClose: () => void
  entries: LeaderboardEntry[]
}

export function LeaderboardDialog({ open, onClose, entries }: LeaderboardDialogProps) {
  const sortedEntries = [...entries].sort((a, b) => b.score - a.score).slice(0, 10)

  const getMedalIcon = (index: number) => {
    if (index === 0) return <Trophy size={24} weight="fill" className="text-yellow-500" />
    if (index === 1) return <Medal size={24} weight="fill" className="text-gray-400" />
    if (index === 2) return <Medal size={24} weight="fill" className="text-amber-700" />
    return <span className="text-muted-foreground font-mono text-sm w-6 text-center">{index + 1}</span>
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'hard': return 'bg-red-500/20 text-red-400'
      default: return 'bg-secondary/20 text-secondary'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '简单'
      case 'medium': return '中等'
      case 'hard': return '困难'
      default: return difficulty
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <Trophy size={32} className="text-accent" weight="fill" />
            排行榜
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {sortedEntries.length === 0 ? (
            <Card className="p-8 text-center">
              <Target size={48} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">还没有游戏记录。开始游戏来查看你的成绩吧！</p>
            </Card>
          ) : (
            sortedEntries.map((entry, index) => (
              <Card key={index} className="p-4 bg-card/80 backdrop-blur-sm border-border hover:bg-card transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8">
                    {getMedalIcon(index)}
                  </div>
                  
                  <div className="flex-1 grid grid-cols-5 gap-3 items-center">
                    <div className="col-span-1">
                      <p className="font-mono text-2xl font-bold text-secondary">{entry.score}</p>
                    </div>
                    
                    <div className="col-span-1 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Target size={16} className="text-muted-foreground" />
                        <span className="text-sm font-mono">{entry.hits}</span>
                      </div>
                    </div>
                    
                    <div className="col-span-1 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Fire size={16} className="text-accent" />
                        <span className="text-sm font-mono">{entry.maxCombo}x</span>
                      </div>
                    </div>
                    
                    <div className="col-span-1 text-center">
                      <Badge variant="outline" className={getDifficultyColor(entry.difficulty)}>
                        {getDifficultyText(entry.difficulty)}
                      </Badge>
                    </div>
                    
                    <div className="col-span-1 text-right">
                      <p className="text-xs text-muted-foreground">
                        {entry.accuracy}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
