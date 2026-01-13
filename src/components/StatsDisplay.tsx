import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { GameStats } from '@/types/game'
import { Trophy, Target, XCircle, Fire } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'

interface StatsDisplayProps {
  stats: GameStats
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  const { t } = useLanguage()
  
  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t.score}</span>
          <span className="font-mono text-2xl font-bold text-secondary">
            {stats.score}
          </span>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target size={16} className="text-secondary" />
              <span className="text-xs text-muted-foreground">{t.hits}</span>
            </div>
            <span className="font-mono text-lg font-bold text-foreground">
              {stats.hits}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <XCircle size={16} className="text-destructive" />
              <span className="text-xs text-muted-foreground">{t.misses}</span>
            </div>
            <span className="font-mono text-lg font-bold text-foreground">
              {stats.misses}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy size={16} className="text-accent" />
              <span className="text-xs text-muted-foreground">{t.accuracy}</span>
            </div>
            <span className="font-mono text-lg font-bold text-foreground">
              {stats.accuracy}%
            </span>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Fire size={16} className="text-accent" weight="fill" />
              <span className="text-xs text-muted-foreground">{t.maxCombo}</span>
            </div>
            <span className="font-mono text-lg font-bold text-foreground">
              {stats.maxCombo}x
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
