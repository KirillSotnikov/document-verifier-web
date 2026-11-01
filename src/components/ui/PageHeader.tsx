import type { FC, ReactNode } from 'react';

export const PageHeader: FC<{ title: string; description: ReactNode; aside?: ReactNode }> = ({
  title,
  description,
  aside,
}) => (
  <div className="flex flex-col gap-4 border-b border-rule pb-6 sm:flex-row sm:items-end sm:justify-between">
    <div className="max-w-xl">
      <h1 className="font-display text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.75rem]">
        {title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-ink-soft">{description}</p>
    </div>
    {aside}
  </div>
);
