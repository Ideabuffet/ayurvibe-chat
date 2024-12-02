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
      console.error('Supabase function error:', error);
      
      // Check if it's a rate limit error
      if (error.message.includes('Rate limit') || error.status === 429) {
        const retryAfter = 20; // Default to 20 seconds if not specified
        throw new Error(`Превышен лимит запросов. Пожалуйста, подождите ${retryAfter} секунд перед следующим запросом.`);
      }
      
      throw new Error(error.message || "Ошибка при получении ответа");
    }

    if (!data || !data.content) {
      throw new Error("Не удалось получить ответ от сервера");
    }

    onToken?.(data.content);
    return data.content;

  } catch (error: any) {
    console.error("Error in getOpenAIResponse:", error);
    throw error;
  }
};