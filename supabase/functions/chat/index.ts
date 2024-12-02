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
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const { message, dosha, category } = await req.json();
    console.log('Processing request:', { message, dosha, category });

    if (!message || !dosha || !category) {
      throw new Error('Missing required parameters');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
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
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Error calling OpenAI API');
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');
    
    return new Response(
      JSON.stringify({ 
        response: data.choices[0].message.content,
        status: 'success'
      }), 
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error in chat function:', error);
    
    // Ensure we always return a properly formatted JSON response
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