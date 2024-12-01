import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const getOpenAIResponse = async (
  message: string,
  dosha: string,
  category: string
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { message, dosha, category }
    })

    if (error) throw new Error(error.message)
    if (!data?.response) throw new Error("Пустой ответ от сервера")

    return data.response

  } catch (error: any) {
    console.error("Error calling Edge Function:", error)
    throw new Error(error.message || "Ошибка при получении ответа")
  }
}