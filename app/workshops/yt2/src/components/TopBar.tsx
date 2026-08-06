import { useCountdown } from '../hooks/useCountdown';
import { Clock, Flame } from 'lucide-react';

export default function TopBar() {
  const { hours, minutes, seconds } = useCountdown();
  
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="urgency-bar sticky top-0 z-50 px-3 py-2 text-center text-white">
      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold">
        <Flame className="w-4 h-4 animate-pulse" />
        <span>⚡ Aaj ki LAST seats — Workshop</span>
        <div className="flex items-center gap-1 bg-black/30 rounded px-2 py-0.5">
          <Clock className="w-3 h-3" />
          <span className="font-mono">{pad(hours)}:{pad(minutes)}:{pad(seconds)}</span>
        </div>
        <span className="hidden sm:inline">mein band ho jayega!</span>
        <Flame className="w-4 h-4 animate-pulse" />
      </div>
    </div>
  );
}
