import { supabase } from '@/integrations/supabase/client';

export const getOpenAIResponse = async (
  message: string,
  dosha: string,
  category: string,
  onToken?: (token: string) => void
): Promise<string> => {
  try {
    const { data: stream, error } = await supabase.functions.invoke('chat', {
      body: { message, dosha, category }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(error.message || "Ошибка при получении ответа");
    }

    if (!stream) {
      throw new Error("Пустой ответ от сервера");
    }

    let fullResponse = '';
    const response = new Response(stream);
    const reader = response.body?.getReader();
    
    if (!reader) {
      throw new Error("Не удалось инициализировать чтение потока");
    }

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const text = new TextDecoder().decode(value);
        const lines = text.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              onToken?.(parsed.content);
              fullResponse += parsed.content;
            }
          } catch (e) {
            console.error('Error parsing line:', e);
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    if (!fullResponse) {
      throw new Error("Не удалось получить ответ от сервера");
    }

    return fullResponse;

  } catch (error: any) {
    console.error("Error in getOpenAIResponse:", error);
    if (error.message.includes('Rate limit')) {
      throw new Error("Превышен лимит запросов. Пожалуйста, подождите 20 секунд перед следующим запросом.");
    }
    throw error;
  }
};