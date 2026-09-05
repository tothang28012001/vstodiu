import type { Status } from '@/lib/types';
import { STATUS_META } from '@/lib/types';

const DOT: Record<Status, string> = {
  released: 'bg-status-released',
  production: 'bg-status-production',
  design: 'bg-status-design',
  concept: 'bg-status-concept',
  shelved: 'bg-status-shelved',
};

const TEXT: Record<Status, string> = {
  released: 'text-status-released',
  production: 'text-status-production',
  design: 'text-status-design',
  concept: 'text-status-concept',
  shelved: 'text-status-shelved',
};

export function StatusChip({ status, size = 'sm' }: { status: Status; size?: 'sm' | 'md' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border border-line bg-ink-850 font-mono uppercase tracking-label ${TEXT[status]} ${
        size === 'md' ? 'px-2.5 py-1 text-[11px]' : 'px-2 py-0.5 text-label'
      }`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} />
      {STATUS_META[status].label}
    </span>
  );
}
