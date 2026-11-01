import type { ButtonHTMLAttributes, FC } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const variants: Record<Variant, string> = {
  primary:
    'bg-stamp text-white hover:bg-stamp-dark disabled:bg-rule disabled:text-ink-faint shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] disabled:shadow-none',
  secondary: 'border border-rule bg-sheet text-ink hover:border-ink-faint hover:bg-paper disabled:opacity-50',
  ghost: 'text-ink-soft hover:bg-paper hover:text-ink disabled:opacity-50',
};

const sizes = {
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-[15px]',
};

export const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: keyof typeof sizes }
> = ({ variant = 'primary', size = 'md', className, type = 'button', ...rest }) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className ?? ''}`}
    {...rest}
  />
);
