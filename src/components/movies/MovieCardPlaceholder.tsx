import { cn } from '@/lib/utils';
import { Card, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';

export function MovieCardPlaceholder({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <Card
      className={cn(
        'bg-muted flex h-[152px] w-full flex-row items-start border-none opacity-35 shadow-none',
        className,
      )}
      {...props}
    >
      <div className="bg-muted-foreground/10 h-[150px] w-[100px] rounded-xl" />
      <CardHeader className="*:bg-muted-foreground/10 flex flex-1 gap-2 p-4 *:block *:rounded-xs">
        <Badge className="w-1/4 shadow-none">&nbsp;</Badge>
        <div className="w-1/2 text-lg">&nbsp;</div>
        <div className="w-full">&nbsp;</div>
        <div className="w-full">&nbsp;</div>
      </CardHeader>
    </Card>
  );
}
