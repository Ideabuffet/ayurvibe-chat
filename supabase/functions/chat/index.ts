import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.1.0"

serve(async (req) => {
  try {
    const { message, dosha, category } = await req.json()
    
    const openai = new OpenAIApi(new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    }))

    const systemPrompt = `Ты - эксперт по Аюрведе, специализирующийся на консультациях по доше ${dosha}. 
    Сейчас пользователь хочет получить информацию в категории ${category}.
    Давай подробные, но лаконичные ответы, основанные на принципах Аюрведы.
    Используй простой и понятный язык. Отвечай на русском языке.`

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
    })

    const response = completion.data.choices[0]?.message?.content

    if (!response) {
      throw new Error("Пустой ответ от API")
    }

    return new Response(
      JSON.stringify({ response }),
      { headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})