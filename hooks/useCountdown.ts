"use client";

import { useEffect, useState } from "react";

export function useCountdown(target: Date | null) {
  const targetTime = target?.getTime() || 0;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const tick = () => setTotal(Math.max(0, targetTime - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetTime]);

  const secondsRemaining = Math.floor(total / 1000);
  return {
    hours: String(Math.floor(secondsRemaining / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((secondsRemaining % 3600) / 60)).padStart(2, "0"),
    seconds: String(secondsRemaining % 60).padStart(2, "0"),
    total,
  };
}
