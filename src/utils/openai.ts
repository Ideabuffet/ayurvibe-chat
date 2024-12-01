import OpenAI from "openai";

export const getOpenAIResponse = async (
  message: string,
  dosha: string,
  category: string
): Promise<string> => {
  const apiKey = localStorage.getItem("openai_api_key");
  
  if (!apiKey) {
    throw new Error("API ключ не найден");
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  const systemPrompt = `Ты - эксперт по Аюрведе, специализирующийся на консультациях по доше ${dosha}. 
Сейчас пользователь хочет получить информацию в категории ${category}.
Давай подробные, но лаконичные ответы, основанные на принципах Аюрведы.
Используй простой и понятный язык. Отвечай на русском языке.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      model: "gpt-4",
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "Извините, не удалось получить ответ";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Не удалось получить ответ от OpenAI");
  }
};