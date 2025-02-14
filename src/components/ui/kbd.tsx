import { cn } from '@/lib/utils';

export default function Kbd({
  render,
  className,
}: {
  render: React.ReactNode | string;
  className?: string;
}) {
  return (
    <code
      className={cn(
        'relative rounded border-2 border-b-4 border-current bg-transparent px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-current',
        className,
      )}
    >
      {render}
    </code>
  );
}
