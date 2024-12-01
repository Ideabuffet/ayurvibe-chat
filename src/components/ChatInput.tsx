import { useState, KeyboardEvent } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { startSpeechRecognition } from "@/utils/voiceUtils";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message);
        setMessage("");
      }
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
      setRecognition(null);
    } else {
      const newRecognition = startSpeechRecognition(
        (text) => {
          setMessage(text);
        },
        () => {
          setIsListening(false);
          setRecognition(null);
        }
      );
      if (newRecognition) {
        setRecognition(newRecognition);
        setIsListening(true);
      }
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
        onKeyPress={handleKeyPress}
        placeholder="Задайте ваш вопрос по Аюрведе..."
        className="flex-1 p-2 rounded-lg border border-ayurveda-accent/30 focus:outline-none focus:border-ayurveda-primary"
        disabled={disabled}
      />
      <Button
        type="button"
        onClick={toggleVoiceInput}
        variant="outline"
        size="icon"
        className={isListening ? "bg-red-100" : ""}
        disabled={disabled}
      >
        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
      </Button>
      <Button type="submit" size="icon" disabled={disabled}>
        <Send size={20} />
      </Button>
    </form>
  );
};