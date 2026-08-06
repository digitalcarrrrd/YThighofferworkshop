import { useState, useEffect } from 'react';

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useCountdown(): CountdownTime {
  const getTargetTime = () => {
    const now = new Date();
    // Pakistan Standard Time is UTC+5
    const pkOffset = 5 * 60;
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const pkNow = new Date(utcMs + pkOffset * 60000);
    
    // Target is 7 PM today PKT
    const target = new Date(pkNow);
    target.setHours(19, 0, 0, 0);
    
    // If past 7 PM, target is 7 PM tomorrow
    if (pkNow >= target) {
      target.setDate(target.getDate() + 1);
    }
    
    // Convert back to local time
    const targetUtcMs = target.getTime() - pkOffset * 60000;
    const targetLocal = new Date(targetUtcMs - now.getTimezoneOffset() * 60000);
    
    return targetLocal;
  };

  const calculateTimeLeft = (): CountdownTime => {
    const now = new Date().getTime();
    const target = getTargetTime().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

export function useSeatsCounter() {
  const [seats, setSeats] = useState(37);

  useEffect(() => {
    // Decrease seats randomly
    const interval = setInterval(() => {
      setSeats(prev => {
        if (prev <= 7) return 7 + Math.floor(Math.random() * 5);
        const decrease = Math.random() > 0.7 ? 2 : 1;
        return Math.max(3, prev - decrease);
      });
    }, 15000 + Math.random() * 30000);

    return () => clearInterval(interval);
  }, []);

  return seats;
}
