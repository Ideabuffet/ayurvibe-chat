import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

const getCategoryPrompt = (category: string) => {
  const prompts: Record<string, string> = {
    general: `Ты - эксперт по Аюрведе. Давай краткие, но информативные ответы, основанные на принципах Аюрведы. Избегай повторений и общих фраз.`,
    health: `Ты - аюрведический консультант по здоровью. Давай конкретные рекомендации по поддержанию баланса доши. Начни с краткого обзора сильных сторон и проблем, связанных с дошей пользователя.`,
    meditation: `Ты - специалист по медитации и пранаяме в Аюрведе. Давай рекомендации по практикам медитации и дыхательным упражнениям, подходящим для доши пользователя.`,
    routine: `Ты - специалист по аюрведическому распорядку дня (Диначарья). Давай рекомендации по ежедневным практикам, учитывая время суток и особенности доши.`,
    nutrition: `Ты - аюрведический диетолог. Давай конкретные рекомендации по питанию, включая список продуктов, время приема пищи и способы приготовления.`,
    herbs: `Ты - специалист по аюрведическим травам. Рекомендуй конкретные травы и способы их применения для баланса доши пользователя.`,
    diet: `Ты - специалист по аюрведическому питанию. Давай подробные рекомендации по диете, включая продукты, специи и режим питания.`,
    chronic: `Ты - специалист по управлению хроническими состояниями в Аюрведе. Давай рекомендации по образу жизни и питанию для облегчения симптомов.`,
    detox: `Ты - специалист по аюрведическому очищению. Давай рекомендации по детоксикации, учитывая особенности доши.`,
    stress: `Ты - специалист по управлению стрессом в Аюрведе. Давай рекомендации по эмоциональному балансу и снижению стресса.`,
    beauty: `Ты - специалист по аюрведической красоте. Давай рекомендации по уходу за кожей и волосами согласно доше.`,
    energy: `Ты - специалист по энергетическим практикам в Аюрведе. Давай рекомендации по повышению энергии и духовным практикам.`,
    sleep: `Ты - специалист по улучшению сна в Аюрведе. Давай рекомендации по режиму сна и вечерним практикам.`
  };

  return prompts[category] || prompts.general;
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