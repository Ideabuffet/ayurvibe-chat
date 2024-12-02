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
      throw new Error(error.message || "Ошибка при получении ответа");
    }

    if (!data || !data.content) {
      throw new Error("Не удалось получить ответ от сервера");
    }

    // Вызываем callback с полным ответом
    onToken?.(data.content);
    return data.content;

  } catch (error: any) {
    console.error("Error in getOpenAIResponse:", error);
    if (error.message.includes('Rate limit')) {
      throw new Error("Превышен лимит запросов. Пожалуйста, подождите 20 секунд перед следующим запросом.");
    }
    throw error;
  }
};