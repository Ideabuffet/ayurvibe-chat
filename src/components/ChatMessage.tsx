import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isAi: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ content, isAi, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-message-appear",
        isAi ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isAi
            ? "bg-ayurveda-primary text-white"
            : "bg-ayurveda-secondary text-ayurveda-text"
        )}
      >
        <p className="text-sm md:text-base">{content}</p>
        <span className="text-xs opacity-70">
          {timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};