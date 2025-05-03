import { useQuery, useQueryClient } from '@tanstack/react-query';

import RecipeAPI from '../recipe.api';
import { RecipeDetails, RecipeParams } from '../../types';

const EMPTY_ARRAY: never[] = [];

const recipeApi = new RecipeAPI('/recipe');

export const useRecipes = (params: RecipeParams = {}) => {
  const { data, ...recipesQuery } = useQuery<RecipeDetails[], Error>({
    queryKey: ['recipes', params],
    queryFn: () => recipeApi.readMany(params),
  });

  const recipes = Array.isArray(data) ? data : EMPTY_ARRAY;

  return Object.assign(recipesQuery, { recipes });
};

export const useRecipe = (recipeId?: string) => {
  const queryClient = useQueryClient();
  const { data, ...recipeQuery } = useQuery<RecipeDetails, Error>({
    queryKey: ['recipe', recipeId],
    enabled: !!recipeId,
    queryFn: () => recipeApi.readOne(recipeId!),
    placeholderData: () => {
      const cachedRecipes: RecipeDetails[] | undefined = queryClient.getQueryData([
        'recipes',
        {},
      ]);

      return cachedRecipes?.find((d) => d.idMeal === recipeId);
    },
  });

  const recipe: RecipeDetails | Record<never, unknown> =
    typeof data === 'object' && 'strMeal' in data ? data : {};

  return Object.assign(recipeQuery, { recipe });
};
