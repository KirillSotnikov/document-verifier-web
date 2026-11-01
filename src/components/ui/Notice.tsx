import type { FC, ReactNode } from 'react';
import { AlertIcon, CheckCircleIcon, CloseIcon } from './icons';

type Tone = 'success' | 'error' | 'caution';

const toneStyles: Record<Tone, { wrap: string; icon: ReactNode }> = {
  success: {
    wrap: 'border-verified/30 bg-verified-wash text-verified',
    icon: <CheckCircleIcon className="size-5" />,
  },
  error: {
    wrap: 'border-fault/30 bg-fault-wash text-fault',
    icon: <CloseIcon className="size-5" />,
  },
  caution: {
    wrap: 'border-caution/30 bg-caution-wash text-caution',
    icon: <AlertIcon className="size-5" />,
  },
};

export const Notice: FC<{
  tone: Tone;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}> = ({ tone, title, children, action, className }) => {
  const style = toneStyles[tone];
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex gap-3 rounded-md border px-4 py-3 ${style.wrap} ${className ?? ''}`}
    >
      <span className="mt-px shrink-0">{style.icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        {children && <div className="mt-0.5 text-sm text-ink-soft break-words">{children}</div>}
      </div>
      {action && <div className="shrink-0 self-center">{action}</div>}
    </div>
  );
};

export const readableError = (error: Error) =>
  (error as Error & { shortMessage?: string }).shortMessage ?? error.message;
