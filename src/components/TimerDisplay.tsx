import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface TimerDisplayProps {
  timeLeft: number
  totalTime: number
}

export function TimerDisplay({ timeLeft, totalTime }: TimerDisplayProps) {
  const percentage = (timeLeft / totalTime) * 100
  const isWarning = timeLeft <= 10 && timeLeft > 5
  const isCritical = timeLeft <= 5

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">剩余时间</span>
          <span
            className={cn(
              'font-mono text-3xl font-bold transition-colors',
              isCritical && 'text-destructive animate-pulse',
              isWarning && 'text-yellow-500',
              !isWarning && !isCritical && 'text-secondary'
            )}
          >
            {timeLeft}秒
          </span>
        </div>
        <Progress
          value={percentage}
          className={cn(
            'h-2',
            isCritical && '[&>div]:bg-destructive',
            isWarning && '[&>div]:bg-yellow-500',
            !isWarning && !isCritical && '[&>div]:bg-secondary'
          )}
        />
      </div>
    </Card>
  )
}
