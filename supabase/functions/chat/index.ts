import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, dosha, category } = await req.json();
    console.log(`Processing request - Message: ${message}, Dosha: ${dosha}, Category: ${category}`);

    if (!message || !dosha || !category) {
      throw new Error('Missing required parameters');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const categoryPrompt = getCategoryPrompt(category);
    const systemMessage = `${categoryPrompt}
    
    ВАЖНЫЕ ПРАВИЛА:
    1. Используй ТОЛЬКО русский язык
    2. НЕ используй английские слова или термины
    3. Все термины должны быть на русском языке
    4. Если встречается медицинский или технический термин на английском, переведи его на русский
    5. Давай структурированные ответы с использованием маркеров списка и разделов
    6. Избегай повторений и общих фраз об Аюрведе
    7. Давай конкретные, практические советы
    8. Используй эмодзи для улучшения читаемости
    
    Текущая доша пользователя: ${dosha}
    
    Отвечай простым и понятным языком, используя только русские слова.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      
      if (error.error?.message?.includes('Rate limit')) {
        const waitTime = 20;
        const match = error.error.message.match(/Please try again in (\d+)s/);
        const retryAfter = match ? parseInt(match[1]) : waitTime;
        
        return new Response(
          JSON.stringify({
            error: 'RATE_LIMIT_ERROR',
            retryAfter,
            message: `Превышен лимит запросов. Пожалуйста, подождите ${retryAfter} секунд.`
          }),
          {
            status: 429,
            headers: { ...corsHeaders }
          }
        );
      }
      
      throw new Error(error.error?.message || 'Error calling OpenAI API');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ content }),
      { headers: corsHeaders }
    );

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

const getCategoryPrompt = (category: string) => {
  const prompts: Record<string, string> = {
    general: `Ты - эксперт по Аюрведе. Давай краткие, но информативные ответы, основанные на принципах Аюрведы. Избегай повторений и общих фраз.`,
    health: `Ты - аюрведический консультант по здоровью. Давай конкретные рекомендации по поддержанию баланса доши.`,
    meditation: `Ты - специалист по медитации и пранаяме в Аюрведе. Давай рекомендации по практикам медитации и дыхательным упражнениям.`,
    routine: `Ты - специалист по аюрведическому распорядку дня (Диначарья). Давай рекомендации по ежедневным практикам.`,
    herbs: `Ты - специалист по аюрведическим травам. Рекомендуй конкретные травы и способы их применения.`,
    diet: `Ты - специалист по аюрведическому питанию. Давай подробные рекомендации по диете.`,
    chronic: `Ты - специалист по управлению хроническими состояниями в Аюрведе. Давай рекомендации по образу жизни.`,
    detox: `Ты - специалист по аюрведическому очищению. Давай рекомендации по детоксикации.`,
    stress: `Ты - специалист по управлению стрессом в Аюрведе. Давай рекомендации по эмоциональному балансу.`,
    beauty: `Ты - специалист по аюрведической красоте. Давай рекомендации по уходу за кожей и волосами.`,
    energy: `Ты - специалист по энергетическим практикам в Аюрведе. Давай рекомендации по повышению энергии.`,
    sleep: `Ты - специалист по улучшению сна в Аюрведе. Давай рекомендации по режиму сна.`,
    dosha: `Ты - эксперт по дошам в Аюрведе. Давай рекомендации с учетом текущей доши пользователя.`
  };

  return prompts[category] || prompts.general;
};