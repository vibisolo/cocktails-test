export type Ingredient = { ingredient: string; measure?: string };

export const extractIngredients = (d: Record<string, unknown>): Ingredient[] => {
  const list: Ingredient[] = [];
  for (let i = 1; i <= 15; i++) {
    const ing = (d)[`strIngredient${i}`];
    const meas = (d)[`strMeasure${i}`];
    if (typeof ing === 'string' && ing.trim()) {
      list.push({ ingredient: ing.trim(), measure: (meas || '').toString().trim() || undefined });
    }
  }
  return list;
};

// можно было черрез filter и map так как данных не много,но лучше всё за 1 цикл сделать 