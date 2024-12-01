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
        text: "Телосложение:",
        answers: [
          {
            text: "Худощавое и хрупкое",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Среднее",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Крупное, с развитой мускулатурой",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "hips",
        text: "Бедра:",
        answers: [
          {
            text: "Узкие",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Средние",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Широкие",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "shoulders",
        text: "Плечи:",
        answers: [
          {
            text: "Узкие",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Средние",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Широкие",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "skin",
        text: "Кожа:",
        answers: [
          {
            text: "Сухая, темная",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Желтоватая, предрасположена к потению, веснушки, родинки",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Жирная, блестящая, светлая",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "body-temperature",
        text: "Температура тела:",
        answers: [
          {
            text: "Низкая, холодные конечности",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Высокая, теплый на ощупь",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Низкая, холодный на ощупь",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "teeth",
        text: "Зубы:",
        answers: [
          {
            text: "Неровные, маленькие, хрупкие",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Желтоватые, среднего размера",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Белые, большие, крепкие",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "lips",
        text: "Губы:",
        answers: [
          {
            text: "Тонкие, темные, сухие, трескающиеся",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Мягкие, розовые или медные",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Толстые, полные, влажные",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "fingers",
        text: "Пальцы:",
        answers: [
          {
            text: "Длинные и тонкие",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Среднего размера",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Толстые и относительно короткие",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "nails",
        text: "Ногти:",
        answers: [
          {
            text: "Короткие, грубые, ломкие, темные, тусклые",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Средние, мягкие, розовые, тонкие",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Длинные, толстые, округлые",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "fat-distribution",
        text: "Распределение жира:",
        answers: [
          {
            text: "В основном в области живота и талии",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Равномерно распределено",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "В основном вокруг бедер и ягодиц",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "height",
        text: "Рост:",
        answers: [
          {
            text: "Очень низкий или очень высокий (и худощавое тело)",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Средний",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Высокий или низкий (и крепкое тело)",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "joints",
        text: "Суставы:",
        answers: [
          {
            text: "Выраженные, сухие, узловатые",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Нормальные, пропорциональные",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Большие, хорошо сформированные, округлые",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "veins",
        text: "Вены:",
        answers: [
          {
            text: "Легко заметные",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Равномерно распределенные",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Не заметные",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "hair",
        text: "Волосы:",
        answers: [
          {
            text: "Тонкие, темные, жесткие, кудрявые или волнистые",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Красивые, мягкие, прямые, блондинистые, рыжие или песочные",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Густые, жесткие, блестящие, волнистые, черные или коричневые",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "face-shape",
        text: "Форма лица:",
        answers: [
          {
            text: "Удлиненная, угловатая, часто недоразвитый подбородок",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Сердцевидная, часто заостренный подбородок",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Крупное, круглое, полное",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "neck",
        text: "Шея:",
        answers: [
          {
            text: "Тонкая, очень длинная или очень короткая",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Средняя, пропорциональная",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Широкая, крепкая",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "nose",
        text: "Нос:",
        answers: [
          {
            text: "Маленький, узкий, с горбинкой",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Средний, прямой, заостренный",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Большой, округлый, луковичный",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "eyes",
        text: "Глаза:",
        answers: [
          {
            text: "Маленькие, узкие, запавшие, темно-коричневые или серые, тусклые",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Средние, светло-голубые, светло-серые или карие, выразительные",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Большие, выдающиеся, голубые или светло-коричневые, привлекательные",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "mouth",
        text: "Рот:",
        answers: [
          {
            text: "Маленький",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Средний",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Большой",
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
        id: "sweating",
        text: "Потоотделение:",
        answers: [
          {
            text: "Минимальное",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Чрезмерное, с кислым запахом",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Умеренное, постоянное",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "pulse",
        text: "Пульс:",
        answers: [
          {
            text: "Слабый, частый (80-100), нерегулярный",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Сильный, умеренный (70-80)",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Постоянный, медленный (60-70), ритмичный",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "temperature-preferences",
        text: "Температурные предпочтения:",
        answers: [
          {
            text: "Сильно предпочитаю тепло",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Предпочитаю прохладу",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Не люблю холод",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "sleep",
        text: "Сон:",
        answers: [
          {
            text: "Легкий, прерывистый",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Глубокий, короткий",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Тяжелый, люблю много спать",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "urination",
        text: "Мочеиспускание:",
        answers: [
          {
            text: "Небольшие объемы, часто",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Умеренные объемы, относительно часто",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Большие объемы, редко",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "bowel-movements",
        text: "Стул:",
        answers: [
          {
            text: "Нерегулярный, склонность к запорам, твердый, сухой",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Регулярный, рыхлый",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Клейкий, обильный, тяжелый",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "activity-level",
        text: "Уровень активности:",
        answers: [
          {
            text: "Очень высокий, беспокойный",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Умеренный",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Медленный, мечтательный",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "gait",
        text: "Ходьба:",
        answers: [
          {
            text: "Быстрая",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Средняя скорость",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Медленная",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "endurance",
        text: "Выносливость:",
        answers: [
          {
            text: "Быстро устаю, нужно время на восстановление",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Хорошо управляемая",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Хорошая vitality и выносливость",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "sexual-drive",
        text: "Сексуальный аппетит:",
        answers: [
          {
            text: "Интенсивный, быстро угасает, ориентирован на фантазии",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Сильный, желания соответствуют действиям",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Медленный, длительная страсть",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "voice",
        text: "Голос:",
        answers: [
          {
            text: "Тихий, слабый",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Резкий, громкий",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Мягкий, успокаивающий",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "speech",
        text: "Речь:",
        answers: [
          {
            text: "Быстрая, разговорчивая",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Четкая, точная, резкая",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Медленная, возможно, колеблющаяся",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "appetite",
        text: "Аппетит:",
        answers: [
          {
            text: "Переменчивый, непостоянный",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Очень хороший",
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
      {
        id: "thirst",
        text: "Жажда:",
        answers: [
          {
            text: "Переменчивая, непостоянная",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Частая",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Редкая",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "preferred-food",
        text: "Предпочитаемая пища:",
        answers: [
          {
            text: "Теплая, горячая, сырая пища с сладкими, кислыми или солеными вкусами",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Очень холодная, сладкая, горькая и вяжущая",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Немного теплый, кислый и вяжущий",
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
        id: "thinking",
        text: "Мышление:",
        answers: [
          {
            text: "Поверхностное, изменчивое, непрактичное",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Точное, логичное, хорошее планирование",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Спокойное, медленное, стабильное, организованное",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "memory",
        text: "Память:",
        answers: [
          {
            text: "Быстро запоминаю, плохая память",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Быстро запоминаю, хороший запоминание",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Медленно запоминаю, долгосрочная память",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "beliefs",
        text: "Убеждения:",
        answers: [
          {
            text: "Часто меняющиеся",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Очень сильные убеждения",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Глубокие, стабильные, неизменные",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "decision-making",
        text: "Принятие решений:",
        answers: [
          {
            text: "Проблематичное",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Быстрое, решительное",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Обдуманное, с размышлениями",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "spending-habits",
        text: "Привычки в расходах:",
        answers: [
          {
            text: "Расточительные и расточительные",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Методические",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Экономные, бережливые",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "interests",
        text: "Интересы:",
        answers: [
          {
            text: "Путешествия, искусство, эзотерика",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Спорт, политика, предметы роскоши",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Мир, бизнес, хорошая еда",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "creativity",
        text: "Творчество:",
        answers: [
          {
            text: "Ярко выраженное, много идей",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "В основном научные или технические изобретения",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Превалирующие в бизнесе",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "emotions",
        text: "Эмоции:",
        answers: [
          {
            text: "Тревога, беспокойство, сомнение, стеснительность",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Гнев, критика, амбиции, практичность, зависть",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Забота, быстрое восстановление настроения, самодовольство, апатия",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
      {
        id: "lifestyle",
        text: "Образ жизни:",
        answers: [
          {
            text: "Беспорядочный",
            vata: 2,
            pitta: 0,
            kapha: 0,
          },
          {
            text: "Занятый, большие планы",
            vata: 0,
            pitta: 2,
            kapha: 0,
          },
          {
            text: "Стабильный, измеренный",
            vata: 0,
            pitta: 0,
            kapha: 2,
          },
        ],
      },
    ],
  },
];
