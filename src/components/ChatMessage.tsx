import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessageProps {
  content: string;
  isAi: boolean;
  timestamp: Date;
  isFirstMessage?: boolean;
  isLoading?: boolean;
}

export const ChatMessage = ({ 
  content, 
  isAi, 
  timestamp, 
  isFirstMessage = false,
  isLoading = false 
}: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-message-appear",
        isAi ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 relative",
          isAi
            ? "bg-ayurveda-primary text-white"
            : "bg-ayurveda-secondary text-ayurveda-text"
        )}
      >
        {isFirstMessage && isAi && (
          <Info className="absolute -left-7 top-2 w-5 h-5 text-ayurveda-primary" />
        )}
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px] bg-white/20" />
            <Skeleton className="h-4 w-[160px] bg-white/20" />
          </div>
        ) : (
          <>
            <p className="text-sm md:text-base">{content}</p>
            <span className="text-xs opacity-70">
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </>
        )}
      </div>
    </div>
  );
};