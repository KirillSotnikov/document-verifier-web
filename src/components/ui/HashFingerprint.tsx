import type { FC } from 'react';

const strip = (hash: string) => hash.replace(/^0x/i, '').toLowerCase();

const toBytes = (hex: string) => {
  const bytes: number[] = [];
  for (let i = 0; i + 1 < hex.length; i += 2) {
    bytes.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return bytes;
};

export const FingerprintStrip: FC<{ hash: string; className?: string }> = ({ hash, className }) => {
  const bytes = toBytes(strip(hash));
  if (bytes.length === 0) return null;

  return (
    <div className={`flex h-2 w-full overflow-hidden rounded-[2px] ${className ?? ''}`} aria-hidden="true">
      {bytes.map((byte, i) => (
        <span
          key={i}
          className="flex-1"
          style={{
            backgroundColor: `hsl(${Math.round((byte / 256) * 360)} ${48 + (byte % 4) * 6}% ${38 + (byte % 5) * 5}%)`,
          }}
        />
      ))}
    </div>
  );
};

export const HashText: FC<{ hash: string; className?: string }> = ({ hash, className }) => {
  const hex = strip(hash);
  const groups = hex.match(/.{1,8}/g) ?? [];

  return (
    <p className={`font-mono text-[13px] leading-6 text-ink break-all ${className ?? ''}`}>
      <span className="text-ink-faint">0x</span>
      {groups.map((group, i) => (
        <span key={i} className={i % 2 === 1 ? 'text-ink-soft' : undefined}>
          {group}
          {i < groups.length - 1 && <span className="inline-block w-1.5" />}
        </span>
      ))}
    </p>
  );
};

export const HashFingerprint: FC<{ hash: string; className?: string }> = ({ hash, className }) => (
  <div className={`space-y-2.5 ${className ?? ''}`}>
    <FingerprintStrip hash={hash} />
    <HashText hash={hash} />
  </div>
);

export const truncateMiddle = (value: string, head = 6, tail = 4) =>
  value.length <= head + tail + 1 ? value : `${value.slice(0, head)}…${value.slice(-tail)}`;
