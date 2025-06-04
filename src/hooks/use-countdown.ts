import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function useCountdown(targetDate: string) {
  const calculateTimeLeft = () => {
    const targetDateObj = dayjs.tz(targetDate, 'America/Sao_Paulo').utc().toDate();
    const localTime = new Date();
    const difference = targetDateObj.getTime() - localTime.getTime();

    if (difference <= 0) return null;

    const days = Math.floor((difference / (1000 * 60 * 60 * 24)));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const isOverdue = !timeLeft

  function formatTimeUnit(value: number, singular: string, plural: string) {
    return `${value} ${value <= 1 ? singular : plural}`;
  }

  const dinamicCountdownText = () => {
    if (isOverdue) return "Prazo encerrado";
    const { days, hours, minutes, seconds } = timeLeft;

    if (days > 0) {
      return `${formatTimeUnit(days, "dia", "dias")} ${formatTimeUnit(hours, "hora", "horas")} restantes`;
    }

    if (hours > 0) {
      return `${formatTimeUnit(hours, "hora", "horas")} ${formatTimeUnit(minutes, "minuto", "minutos")} restantes`;
    }

    return `${formatTimeUnit(minutes, "minuto", "minutos")} ${formatTimeUnit(seconds, "segundo", "segundos")} restantes`;
  }


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return {
    timeLeft,
    isOverdue,
    dinamicCountdownText
  };
}
