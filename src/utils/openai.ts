import { supabase } from '@/integrations/supabase/client';

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
      let errorBody;
      try {
        errorBody = JSON.parse(error.message);
      } catch {
        errorBody = { error: error.message };
      }

      if (error.status === 429 || errorBody.error?.includes('Rate limit')) {
        const retryAfter = errorBody.retryAfter || 20;
        throw new Error(`Превышен лимит запросов. Пожалуйста, подождите ${retryAfter} секунд и попробуйте снова.`);
      }
      
      throw new Error(errorBody.error || "Ошибка при получении ответа");
    }

    if (!data) {
      throw new Error("Пустой ответ от сервера");
    }

    let fullResponse = '';
    const reader = new Response(data).body?.getReader();
    
    if (!reader) {
      throw new Error("Не удалось инициализировать чтение потока");
    }

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      
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
          console.error('Error parsing JSON:', e);
        }
      }
    }

    return fullResponse;

  } catch (error: any) {
    console.error("Error calling Edge Function:", error);
    throw error;
  }
};