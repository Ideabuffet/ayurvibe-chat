export type Answer = {
  text: string;
  vata: number;
  pitta: number;
  kapha: number;
};

export type Question = {
  id: string;
  text: string;
  answers: Answer[];
};

export type Section = {
  id: string;
  title: string;
  questions: Question[];
};

export const doshaQuestions: Section[] = [
  {
    id: "physical",
    title: "Физические характеристики",
    questions: [
      {
        id: "body-type",
        text: "Как бы вы описали свой тип телосложения?",
        answers: [
          {
            text: "Стройное и хрупкое",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Среднее телосложение",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Крепкое, с хорошо развитой мускулатурой",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
    ],
  },
  {
    id: "physiological",
    title: "Физиологические функции",
    questions: [
      {
        id: "appetite",
        text: "Какой у вас обычно аппетит?",
        answers: [
          {
            text: "Переменчивый, непостоянный",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Сильный и постоянный",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Умеренный",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
    ],
  },
  {
    id: "personality",
    title: "Личностные аспекты",
    questions: [
      {
        id: "emotions",
        text: "Как вы обычно обрабатываете эмоции?",
        answers: [
          {
            text: "Тревожно или беспокойно",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Страстно или интенсивно",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Спокойно и стабильно",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
    ],
  },
];