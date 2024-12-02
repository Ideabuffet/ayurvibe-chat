import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, dosha, category } = await req.json();
    console.log(`Processing request - Message: ${message}, Dosha: ${dosha}, Category: ${category}`);

    if (!message || !dosha || !category) {
      throw new Error('Missing required parameters');
    }

    const systemMessage = `Ты - эксперт по Аюрведе, специализирующийся на консультациях по доше ${dosha}. 
    Сейчас пользователь хочет получить информацию в категории ${category}.
    
    ВАЖНЫЕ ПРАВИЛА:
    1. Используй ТОЛЬКО русский язык
    2. НЕ используй английские слова или термины
    3. Все термины должны быть на русском языке
    4. Если встречается медицинский или технический термин на английском, переведи его на русский
    5. Давай краткие, но информативные ответы, основанные на принципах Аюрведы
    
    Пример замены английских терминов на русские:
    - digestive system -> пищеварительная система
    - metabolism -> обмен веществ
    - immunity -> иммунитет
    
    Отвечай простым и понятным языком, используя только русские слова.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message }
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Error calling OpenAI API');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return new Response(JSON.stringify({ content }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal Server Error',
        details: "Пожалуйста, попробуйте позже"
      }),
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
});