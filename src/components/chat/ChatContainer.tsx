import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChatInput } from "@/components/ChatInput";
import { DoshaType } from "@/types/dosha";
import { MessageList } from "./MessageList";
import { RetryTimer } from "./RetryTimer";
import { ChatInitializer } from "./ChatInitializer";
import { useChatMessageHandler } from "./ChatMessageHandler";

interface ChatContainerProps {
  category: string;
  dosha: DoshaType;
}

export const ChatContainer = ({ category, dosha }: ChatContainerProps) => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean; timestamp: Date }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [retryTimeout, setRetryTimeout] = useState<number | null>(null);
  const [currentResponse, setCurrentResponse] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { handleSendMessage } = useChatMessageHandler({
    category,
    dosha,
    messages,
    setMessages,
    isTyping,
    setIsTyping,
    retryTimeout,
    setRetryTimeout,
    currentResponse,
    setCurrentResponse,
  });

  return (
    <Card className="p-4">
      <ChatInitializer
        category={category}
        dosha={dosha}
        setMessages={setMessages}
        setIsInitializing={setIsInitializing}
        setCurrentResponse={setCurrentResponse}
      />
      <div className="space-y-4">
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          <MessageList
            messages={messages}
            isTyping={isTyping}
            isInitializing={isInitializing}
          />
          <div ref={messagesEndRef} />
        </div>
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping || isInitializing || retryTimeout !== null} 
        />
        {retryTimeout !== null && (
          <RetryTimer
            timeout={retryTimeout}
            onTimeout={() => setRetryTimeout(null)}
          />
        )}
      </div>
    </Card>
  );
};