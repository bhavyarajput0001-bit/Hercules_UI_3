import { Icon } from '@/components/Icon';
import { Skeleton } from '@/components/ui';

/** Shared loading body so a screen swap never flashes blank. */
export function ScreenLoad() {
  return (
    <div className="screen-load" aria-busy="true">
      <div className="screen-load__head">
        <Icon name="core" size={16} className="spin-slow" />
        <span className="mono">mounting surface…</span>
      </div>
      <div className="screen-load__grid">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="screen-load__block">
            <Skeleton w={`${40 + ((i * 13) % 50)}%`} h={12} />
            <Skeleton h={54} radius={8} />
          </div>
        ))}
      </div>
    </div>
  );
}
