import { supabase } from '@/integrations/supabase/client'

export const getOpenAIResponse = async (
  message: string,
  dosha: string,
  category: string
): Promise<string> => {
  try {
    console.log('Calling Edge Function with:', { message, dosha, category });
    
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { message, dosha, category }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(error.message || "Ошибка при вызове функции");
    }

    if (!data) {
      console.error('Empty response from server');
      throw new Error("Пустой ответ от сервера");
    }

    if (!data.response && data.error) {
      console.error('Server returned error:', data.error);
      throw new Error(data.error);
    }

    if (typeof data.response !== 'string') {
      console.error('Invalid response format:', data);
      throw new Error("Неверный формат ответа от сервера");
    }

    console.log('Successfully received response from Edge Function');
    return data.response;

  } catch (error: any) {
    console.error("Error calling Edge Function:", error);
    throw new Error(error.message || "Ошибка при получении ответа");
  }
};