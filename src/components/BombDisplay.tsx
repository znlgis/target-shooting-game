import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bomb } from '@phosphor-icons/react'

interface BombDisplayProps {
  bombCount: number
  onUseBomb: () => void
  disabled: boolean
}

export function BombDisplay({ bombCount, onUseBomb, disabled }: BombDisplayProps) {
  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Bomb size={18} className="text-destructive" weight="fill" />
          <span>Bombs</span>
        </div>
        <div className="flex items-center justify-between gap-3">
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
              <span className="text-sm text-muted-foreground">No bombs</span>
            )}
          </div>
          <Button
            onClick={onUseBomb}
            disabled={disabled || bombCount === 0}
            variant="destructive"
            size="sm"
            className="font-semibold"
          >
            <Bomb size={18} weight="fill" />
            Use
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Hit 3 targets in a row to earn a bomb
        </p>
      </div>
    </Card>
  )
}
