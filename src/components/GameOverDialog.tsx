import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GameStats } from '@/types/game'
import { Trophy, Target, XCircle, ArrowClockwise, Fire } from '@phosphor-icons/react'
import { Separator } from '@/components/ui/separator'
import { useLanguage } from '@/contexts/LanguageContext'

interface GameOverDialogProps {
  open: boolean
  stats: GameStats
  onRestart: () => void
}

export function GameOverDialog({ open, stats, onRestart }: GameOverDialogProps) {
  const { t } = useLanguage()
  
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <Trophy size={32} className="text-accent" weight="fill" />
            {t.gameOver}
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {t.yourFinalScore}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Card className="p-6 bg-primary/20 border-secondary">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">{t.score}</p>
              <p className="font-mono text-5xl font-bold text-secondary">
                {stats.score}
              </p>
            </div>
          </Card>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <Target size={24} className="text-secondary" weight="fill" />
              </div>
              <p className="text-xs text-muted-foreground">{t.hits}</p>
              <p className="font-mono text-2xl font-bold">{stats.hits}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <XCircle size={24} className="text-destructive" weight="fill" />
              </div>
              <p className="text-xs text-muted-foreground">{t.misses}</p>
              <p className="font-mono text-2xl font-bold">{stats.misses}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <Trophy size={24} className="text-accent" weight="fill" />
              </div>
              <p className="text-xs text-muted-foreground">{t.accuracy}</p>
              <p className="font-mono text-2xl font-bold">{stats.accuracy}%</p>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <Fire size={24} className="text-accent" weight="fill" />
              </div>
              <p className="text-xs text-muted-foreground">{t.maxCombo}</p>
              <p className="font-mono text-2xl font-bold">{stats.maxCombo}x</p>
            </div>
          </div>

          <Button 
            onClick={onRestart} 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            size="lg"
          >
            <ArrowClockwise size={20} weight="bold" />
            {t.playAgain}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
