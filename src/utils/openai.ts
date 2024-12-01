import OpenAI from "openai";
import { toast } from "sonner";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MAX_RETRIES = 3;
const RETRY_DELAY = 20000; // 20 seconds
const NETWORK_RETRY_DELAY = 2000; // 2 seconds

export const getOpenAIResponse = async (
  message: string,
  dosha: string,
  category: string
): Promise<string> => {
  const apiKey = localStorage.getItem("openai_api_key");
  
  if (!apiKey) {
    toast.error("API ключ не найден");
    throw new Error("API ключ не найден");
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  const systemPrompt = `Ты - эксперт по Аюрведе, специализирующийся на консультациях по доше ${dosha}. 
Сейчас пользователь хочет получить информацию в категории ${category}.
Давай подробные, но лаконичные ответы, основанные на принципах Аюрведы.
Используй простой и понятный язык. Отвечай на русском языке.`;

  let retries = MAX_RETRIES;
  let lastError: any = null;

  while (retries > 0) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        model: "gpt-3.5-turbo", // Using GPT-3.5 to avoid rate limits
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error("Пустой ответ от API");
      }

      return response;

    } catch (error: any) {
      lastError = error;
      console.error("OpenAI API Error:", error);
      
      if (error?.status === 429) {
        retries--;
        if (retries > 0) {
          toast.warning(`Превышен лимит запросов. Повторная попытка через ${RETRY_DELAY/1000} секунд...`);
          await delay(RETRY_DELAY);
          continue;
        }
      } else if (error.message?.includes('Failed to fetch') || error.code === 'ECONNRESET') {
        retries--;
        if (retries > 0) {
          toast.warning("Ошибка сети. Повторная попытка...");
          await delay(NETWORK_RETRY_DELAY);
          continue;
        }
      } else {
        // For other errors, don't retry
        break;
      }
    }
  }

  // Handle final error
  const errorMessage = lastError?.error?.message || lastError?.message || "Неизвестная ошибка";
  toast.error(errorMessage);
  throw new Error(errorMessage);
};