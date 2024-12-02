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

    if (!data) {
      console.error('Empty response from server')
      throw new Error("Пустой ответ от сервера")
    }

    if (!data.response && data.error) {
      console.error('Server returned error:', data.error)
      throw new Error(data.error)
    }

    if (typeof data.response !== 'string') {
      console.error('Invalid response format:', data)
      throw new Error("Неверный формат ответа от сервера")
    }

    return data.response

  } catch (error: any) {
    console.error("Error calling Edge Function:", error)
    throw new Error(error.message || "Ошибка при получении ответа")
  }
}