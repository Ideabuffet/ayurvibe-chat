import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const makeOpenAIRequest = async (message: string, dosha: string, category: string, retryCount = 0): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);

      // Check if it's a rate limit error
      if (error.error?.message?.includes('Rate limit reached') && retryCount < 3) {
        console.log(`Rate limit hit, retry attempt ${retryCount + 1}`);
        // Wait for 21 seconds before retrying (as per the error message)
        await sleep(21000);
        return makeOpenAIRequest(message, dosha, category, retryCount + 1);
      }

      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    if (error.message?.includes('Rate limit reached') && retryCount < 3) {
      console.log(`Rate limit hit, retry attempt ${retryCount + 1}`);
      await sleep(21000);
      return makeOpenAIRequest(message, dosha, category, retryCount + 1);
    }
    throw error;
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, dosha, category } = await req.json();
    console.log('Processing request:', { message, dosha, category });

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const response = await makeOpenAIRequest(message, dosha, category);
    
    return new Response(JSON.stringify({ response }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Пожалуйста, подождите немного и попробуйте снова." 
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});