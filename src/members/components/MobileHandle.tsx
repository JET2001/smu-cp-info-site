import type { PropsWithChildren } from 'react';

type MobileHandleProps = PropsWithChildren<{
  label: string;
}>;

export function MobileHandle({ label, children }: MobileHandleProps) {
  return (
    <div className="grid grid-cols-[36px_1fr] gap-2.5 text-sm leading-[normal]">
      <span className="text-[10px] font-semibold tracking-widest text-muted">
        {label}
      </span>
      {children}
    </div>
  );
}
