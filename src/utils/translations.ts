type TranslationMap = {
  [key: string]: string;
};

export const ayurvedaTranslations: TranslationMap = {
  "Vata": "Вата",
  "Pitta": "Питта",
  "Kapha": "Капха",
  "dosha": "доша",
  "doshas": "доши",
  "Ayurveda": "Аюрведа",
  "Panchakarma": "Панчакарма",
  "vitality": "жизненная сила",
  "wellness": "благополучие",
  "balance": "баланс",
  "energy": "энергия",
  "meditation": "медитация",
  "yoga": "йога",
  "herbs": "травы",
  "health": "здоровье",
  "lifestyle": "образ жизни",
  "treatment": "лечение",
  "healing": "исцеление",
  "massage": "массаж",
  "therapy": "терапия",
  "diet": "диета",
  "nutrition": "питание"
};

export const translateAyurvedaTerms = (text: string): string => {
  let translatedText = text;
  
  Object.entries(ayurvedaTranslations).forEach(([english, russian]) => {
    // Create a regex that matches the word with word boundaries
    const regex = new RegExp(`\\b${english}\\b`, 'g');
    translatedText = translatedText.replace(regex, russian);
  });
  
  return translatedText;
};