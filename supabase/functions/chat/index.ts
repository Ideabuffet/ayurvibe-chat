import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, options: RequestInit, retries = 3, backoff = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
      
      const error = await response.json();
      console.error(`Attempt ${i + 1} failed:`, error);
      
      if (error.error?.message?.includes('Rate limit reached')) {
        console.log('Rate limit hit, waiting before retry...');
        await delay(backoff * (i + 1));
        continue;
      }
      
      throw new Error(error.error?.message || 'Unknown error');
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Retrying after error: ${error.message}`);
      await delay(backoff * (i + 1));
    }
  }
  throw new Error('Max retries reached');
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    const { message, dosha, category } = await req.json();
    console.log('Processing request:', { message, dosha, category });

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const response = await fetchWithRetry(
      'https://api.openai.com/v1/chat/completions',
      {
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
              Давай подробные, но лаконичные ответы, основанные на принципах Аюрведы.
              Используй простой и понятный язык. Отвечай на русском языке.`
            },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      },
      3,
      2000
    );

    const data = await response.json();
    console.log('OpenAI response received');
    
    return new Response(
      JSON.stringify({ response: data.choices[0].message.content }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Пожалуйста, подождите немного и попробуйте снова." 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});