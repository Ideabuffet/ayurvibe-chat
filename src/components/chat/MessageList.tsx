import { ChatMessage } from "@/components/ChatMessage";

interface Message {
  content: string;
  isAi: boolean;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  isInitializing: boolean;
}

export const MessageList = ({ messages, isTyping, isInitializing }: MessageListProps) => {
  if (isInitializing) {
    return (
      <div className="text-center text-gray-500">
        <ChatMessage
          content="Загрузка..."
          isAi={true}
          timestamp={new Date()}
          isLoading={true}
        />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Начните диалог, задав свой вопрос
      </div>
    );
  }

  return (
    <>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          content={message.content}
          isAi={message.isAi}
          timestamp={message.timestamp}
          isFirstMessage={index === 0}
          isLoading={isTyping && index === messages.length - 1 && message.isAi}
        />
      ))}
    </>
  );
};