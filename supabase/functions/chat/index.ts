import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, dosha, category } = await req.json();

    if (!message || !dosha || !category) {
      throw new Error('Missing required parameters');
    }

    console.log(`Processing chat request - Dosha: ${dosha}, Category: ${category}, Message: ${message}`);

    const systemMessage = `Ты - эксперт по Аюрведе, специализирующийся на консультациях по доше ${dosha}. 
    Сейчас пользователь хочет получить информацию в категории ${category}.
    Давай краткие, но информативные ответы, основанные на принципах Аюрведы.
    Используй простой и понятный язык. Отвечай на русском языке.`;

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
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Error calling OpenAI API');
    }

    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.includes('[DONE]')) continue;
          
          if (line.startsWith('data: ')) {
            try {
              const json = JSON.parse(line.slice(6));
              const content = json.choices[0]?.delta?.content || '';
              if (content) {
                controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`));
              }
            } catch (error) {
              console.error('Error parsing chunk:', error);
              console.error('Problematic line:', line);
            }
          }
        }
      },
    });

    return new Response(response.body?.pipeThrough(transformStream), {
      headers: corsHeaders,
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});