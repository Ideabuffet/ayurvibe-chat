import { useEffect } from "react";

interface RetryTimerProps {
  timeout: number;
  onTimeout: () => void;
}

export const RetryTimer = ({ timeout, onTimeout }: RetryTimerProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, timeout * 1000);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  return (
    <div className="text-center text-sm text-gray-500">
      Следующий запрос будет доступен через {timeout} секунд
    </div>
  );
};