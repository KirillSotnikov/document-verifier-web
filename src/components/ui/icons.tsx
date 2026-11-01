import type { FC, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  ...props,
});

export const SealIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="10" r="6.5" />
    <path d="m9.25 10 1.9 1.9 3.6-3.6" />
    <path d="m8.5 15.5-1.5 6 5-2.5 5 2.5-1.5-6" />
  </svg>
);

export const UploadIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M12 15V4m0 0-4 4m4-4 4 4" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);

export const CheckCircleIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
);

export const DocumentIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

export const TextIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M4 6h16M4 11h16M4 16h10" />
  </svg>
);

export const CloseIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const MenuIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const ChevronDownIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const CheckIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const AlertIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M12 9v4m0 3.5h.01" />
    <path d="M10.3 3.9 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
  </svg>
);

export const CopyIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

export const PencilIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z" />
    <path d="m13.5 6.5 4 4" />
  </svg>
);

export const RefreshIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M20 11a8 8 0 0 0-14.9-3.5M4 4v4h4" />
    <path d="M4 13a8 8 0 0 0 14.9 3.5M20 20v-4h-4" />
  </svg>
);

export const ExternalIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
  </svg>
);

export const WalletIcon: FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M19 7V5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-4a2 2 0 0 0 0 4h4v2a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6" />
  </svg>
);

export const Spinner: FC<{ className?: string }> = ({ className }) => (
  <span
    className={`inline-block size-4 rounded-full border-2 border-current border-t-transparent animate-spin ${className ?? ''}`}
    aria-hidden="true"
  />
);
