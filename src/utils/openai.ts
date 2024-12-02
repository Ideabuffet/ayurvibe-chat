import { supabase } from '@/integrations/supabase/client';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getOpenAIResponse = async (
  message: string,
  dosha: string,
  category: string,
  onToken?: (token: string) => void
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { message, dosha, category }
    });

    if (error) {
      // Check if it's a rate limit error
      const errorBody = JSON.parse(error.message);
      if (error.status === 429 || errorBody.error === 'Rate limit reached') {
        const retryAfter = errorBody.retryAfter || 20;
        throw new Error(`Превышен лимит запросов. Пожалуйста, подождите ${retryAfter} секунд и попробуйте снова.`);
      }
      throw error;
    }

    if (!data) {
      throw new Error("Пустой ответ от сервера");
    }

    const reader = data.getReader();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }

      // Convert the Uint8Array to a string
      const text = new TextDecoder().decode(value);
      const lines = text.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const token = line.slice(6);
        
        if (token && onToken) {
          onToken(token);
          fullResponse += token;
        }
      }
    }

    return fullResponse;

  } catch (error: any) {
    console.error("Error calling Edge Function:", error);
    throw new Error(error.message || "Ошибка при получении ответа");
  }
};