import type { FC } from 'react';
import { CheckIcon, Spinner } from './icons';

export type StepState = 'idle' | 'active' | 'done';

export interface Step {
  title: string;
  description: string;
  state: StepState;
}

export const StepList: FC<{ steps: Step[] }> = ({ steps }) => (
  <ol className="relative">
    {steps.map((step, i) => {
      const isLast = i === steps.length - 1;
      return (
        <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
          {!isLast && (
            <span
              className={`absolute left-[13px] top-8 bottom-1 w-px ${
                step.state === 'done' ? 'bg-verified/50' : 'bg-rule'
              }`}
              aria-hidden="true"
            />
          )}
          <span
            className={`relative z-[1] flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
              step.state === 'done'
                ? 'border-verified bg-verified text-white'
                : step.state === 'active'
                ? 'border-stamp bg-stamp-wash text-stamp'
                : 'border-rule bg-sheet text-ink-faint'
            }`}
          >
            {step.state === 'done' ? (
              <CheckIcon className="size-3.5" strokeWidth={2.5} />
            ) : step.state === 'active' ? (
              <Spinner className="size-3" />
            ) : (
              i + 1
            )}
          </span>
          <div className="pt-0.5">
            <p className={`text-sm font-semibold ${step.state === 'idle' ? 'text-ink-soft' : 'text-ink'}`}>
              {step.title}
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-ink-faint">{step.description}</p>
          </div>
        </li>
      );
    })}
  </ol>
);
