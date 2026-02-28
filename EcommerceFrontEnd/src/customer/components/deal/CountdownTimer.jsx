import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, Tag } from 'lucide-react';

const CountdownTimer = ({ hours, minutes, seconds }) => {
  const [timeLeft, setTimeLeft] = useState({ hours, minutes, seconds });

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft(prev => ({ ...prev, seconds: prev.seconds - 1 }));
      } else if (timeLeft.minutes > 0) {
        setTimeLeft(prev => ({ minutes: prev.minutes - 1, seconds: 59, hours: prev.hours }));
      } else if (timeLeft.hours > 0) {
        setTimeLeft(prev => ({ hours: prev.hours - 1, minutes: 59, seconds: 59 }));
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="flex items-center gap-1">
      <Clock size={16} className="text-red-500" />
      <span className="text-sm font-medium">
        Ends in: {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
      </span>
    </div>
  );
};
export default CountdownTimer;