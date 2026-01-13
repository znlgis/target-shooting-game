import { Card } from '@/components/ui/card'
import { Bomb } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'

interface BombDisplayProps {
  bombCount: number
  disabled: boolean
}

export function BombDisplay({ bombCount, disabled }: BombDisplayProps) {
  const { t, language } = useLanguage()
  
  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Bomb size={18} className="text-destructive" weight="fill" />
          <span>{t.bombs}</span>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(bombCount, 5) }).map((_, i) => (
            <Bomb key={i} size={24} className="text-destructive" weight="fill" />
          ))}
          {bombCount > 5 && (
            <span className="font-mono text-lg font-bold text-destructive">
              +{bombCount - 5}
            </span>
          )}
          {bombCount === 0 && (
            <span className="text-sm text-muted-foreground">
              {language === 'zh' ? '没有炸弹' : 'No bombs'}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            {language === 'zh' ? '连续命中3个靶可获得1个炸弹' : '3 consecutive hits earn 1 bomb'}
          </p>
          <p className="text-xs text-secondary font-semibold">
            {language === 'zh' ? '右键点击在鼠标位置使用炸弹' : 'Right-click at cursor position to use bomb'}
          </p>
        </div>
      </div>
    </Card>
  )
}
