import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const COCKTAIL_CODES = ['margarita', 'mojito', 'a1', 'kir'] as const;
export type CocktailCode = (typeof COCKTAIL_CODES)[number];

export interface Drink {
  idDrink: string;
  strDrink: string;
  strCategory?: string;
  strAlcoholic?: string;
  strGlass?: string;
  strInstructions?: string;
  strDrinkThumb?: string;
  [key: string]: unknown; 
}

interface SearchResponse {
  drinks: Drink[] | null;
}

export const cocktailsApi = createApi({
  reducerPath: 'cocktailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.thecocktaildb.com/api/json/v1/1/',
  }),
  endpoints: (builder) => ({
    searchByCode: builder.query<Drink[], CocktailCode>({
      query: (code) => `search.php?s=${code}`,
      transformResponse: (res: SearchResponse) => res.drinks ?? [],
    }),
  }),
});

export const { useSearchByCodeQuery } = cocktailsApi;
