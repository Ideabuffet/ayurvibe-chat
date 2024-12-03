import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChatInput } from "@/components/ChatInput";
import { DoshaType } from "@/types/dosha";
import { MessageList } from "./MessageList";
import { RetryTimer } from "./RetryTimer";
import { ChatInitializer } from "./ChatInitializer";
import { useChatMessageHandler } from "./ChatMessageHandler";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ChatContainerProps {
  category: string;
  dosha: DoshaType;
}

export const ChatContainer = ({ category, dosha }: ChatContainerProps) => {
  const navigate = useNavigate();
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
      {category === 'general' && (
        <div className="mb-6 p-4 bg-ayurveda-primary/10 rounded-lg">
          <p className="text-ayurveda-primary mb-3">
            Рекомендуем перед тем как задавать вопросы в чате определить дошу
          </p>
          <Button 
            onClick={() => navigate('/chat/dosha')}
            className="bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            Определить дошу
          </Button>
        </div>
      )}
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