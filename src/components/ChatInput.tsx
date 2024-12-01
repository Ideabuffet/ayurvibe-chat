import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white p-4 border-t border-ayurveda-accent/20"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask your Ayurvedic question..."
        className="flex-1 p-2 rounded-lg border border-ayurveda-accent/30 focus:outline-none focus:border-ayurveda-primary"
      />
      <button
        type="submit"
        className="bg-ayurveda-primary text-white p-2 rounded-lg hover:bg-ayurveda-primary/90 transition-colors"
      >
        <Send size={20} />
      </button>
    </form>
  );
};