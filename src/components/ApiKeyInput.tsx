import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const ApiKeyInput = () => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = localStorage.getItem("openai_api_key");
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem("openai_api_key", apiKey);
    toast({
      title: "API ключ сохранен",
      description: "Ваш ключ API был успешно сохранен",
    });
  };

  return (
    <div className="flex gap-2 items-center mb-4">
      <Input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Введите ваш ключ OpenAI API"
        className="flex-1"
      />
      <Button onClick={handleSave}>Сохранить ключ</Button>
    </div>
  );
};