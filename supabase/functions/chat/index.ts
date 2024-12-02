import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error('Failed to parse request body:', e);
      throw new Error('Invalid request format');
    }

    const { message, dosha, category } = body;
    console.log('Processing request:', { message, dosha, category });

    if (!message || !dosha || !category) {
      console.error('Missing required parameters:', { message, dosha, category });
      throw new Error('Missing required parameters');
    }

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Ты - эксперт по Аюрведе, специализирующийся на консультациях по доше ${dosha}. 
            Сейчас пользователь хочет получить информацию в категории ${category}.
            Давай краткие, но информативные ответы, основанные на принципах Аюрведы.
            Используй простой и понятный язык. Отвечай на русском языке.
            Ограничь ответ 2-3 короткими абзацами.`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500, // Уменьшаем максимальное количество токенов
      }),
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Error calling OpenAI API');
    }

    const data = await openAIResponse.json();
    console.log('OpenAI response received successfully');

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid OpenAI response format:', data);
      throw new Error('Invalid response from OpenAI');
    }

    return new Response(
      JSON.stringify({
        response: data.choices[0].message.content,
        status: 'success'
      }),
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error in chat function:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal Server Error',
        details: "Пожалуйста, подождите немного и попробуйте снова."
      }),
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
});