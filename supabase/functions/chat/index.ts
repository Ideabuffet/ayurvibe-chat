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

    console.log(`Processing request for dosha: ${dosha}, category: ${category}`);

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
            Давай краткие, но информативные ответы, основанные на принципах Аюрведы.
            Используй простой и понятный язык. Отвечай на русском языке.
            Ограничь ответ 2-3 короткими абзацами.`
          },
          { role: 'user', content: message }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: 'Rate limit reached',
            details: 'Пожалуйста, подождите 20 секунд и попробуйте снова.',
            retryAfter: 20
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      throw new Error(error.error?.message || 'Error calling OpenAI API');
    }

    // Transform the response into a readable stream
    const stream = response.body;
    const reader = stream.getReader();
    const encoder = new TextEncoder();

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              
              if (done) {
                controller.close();
                break;
              }

              const text = new TextDecoder().decode(value);
              const lines = text.split('\n').filter(line => line.trim() !== '');
              
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  if (data === '[DONE]') continue;
                  
                  try {
                    const parsed = JSON.parse(data);
                    const token = parsed.choices[0]?.delta?.content || '';
                    if (token) {
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: token })}\n\n`));
                    }
                  } catch (e) {
                    console.error('Error parsing JSON:', e);
                  }
                }
              }
            }
          } catch (error) {
            console.error('Stream reading error:', error);
            controller.error(error);
          }
        },
      }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
        }
      }
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});