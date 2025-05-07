import { type FC } from 'react';
import { useParams } from 'react-router';

import { useRecipe } from '../../api';
import { useToastOnError } from '../../hooks';
import { Image, Spinner } from '../../components';
import {
  RecipeHeader,
  RecipeInstructions,
  RecipeIngredients,
  CategoryRecipes,
} from './components';

import './Recipe.css';

export const Recipe: FC = () => {
  const { id } = useParams();
  const { recipe, error, isLoading, isError } = useRecipe(id);
  useToastOnError(`Recipe #${id}`, isError, error);

  return (
    <article className="recipe frame-grid">
      <RecipeHeader
        recipeId={id!}
        recipe={recipe}
        isLoading={isLoading}
        isError={isError}
      />
      {'strMeal' in recipe && !(isLoading || isError) ? (
        <>
          <div className="breakout recipe__breakout">
            <div className="recipe__image-container">
              <Image src={recipe.strMealThumb} className="recipe__image" />
            </div>
            <CategoryRecipes category={recipe.strCategory} />
          </div>
          <section>
            <RecipeInstructions recipeId={id!} instructions={recipe.strInstructions} />
            <RecipeIngredients recipe={recipe} />
          </section>
        </>
      ) : isLoading ? (
        <Spinner />
      ) : null}
    </article>
  );
};
