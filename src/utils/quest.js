const TypeVariants = {
  MYSTIC: 'Мистика',
  ADVENTURES: 'Приключения',
  DETECTIVE: 'Детектив',
  HORROR: 'Ужасы',
  SCI_FI: 'Sci-fi',
  UNKNOWN: 'Неизвестно',
};

const ComplexityVariants = {
  EASY: 'простой',
  MEDIUM: 'средний',
  HARD: 'сложный',
  UNKNOWN: 'Неизвестно',
};

export const formatPeopleCount = (count) => count && count.join('-');

export const getQuestType = (type) => {
  const variants = {
    horror: TypeVariants.HORROR,
    mystic: TypeVariants.MYSTIC,
    adventures: TypeVariants.ADVENTURES,
    'sci-fi': TypeVariants.SCI_FI,
    detective: TypeVariants.DETECTIVE,
  };

  return variants[type] ?? TypeVariants.UNKNOWN;
};

export const formatQuestComplexity = (complexity) => {
  const variants = {
    easy: ComplexityVariants.EASY,
    medium: ComplexityVariants.MEDIUM,
    hard: ComplexityVariants.HARD,
  };

  return variants[complexity] ?? ComplexityVariants.UNKNOWN;
};

export const filterQuestsByType = (items, selectedType) => {
  if (selectedType === 'all') {
    return [...items];
  }

  return [...items].filter((item) => item.type === selectedType);
};
