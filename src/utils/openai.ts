import { supabase } from '@/integrations/supabase/client'

export const getOpenAIResponse = async (
  message: string,
  dosha: string,
  category: string
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { message, dosha, category },
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (error) {
      console.error('Supabase function error:', error)
      throw new Error(error.message || "Ошибка при вызове функции")
    }

    if (!data?.response) {
      console.error('Empty response from server:', data)
      throw new Error("Пустой ответ от сервера")
    }

    return data.response

  } catch (error: any) {
    console.error("Error calling Edge Function:", error)
    throw new Error(error.message || "Ошибка при получении ответа")
  }
}