import { type FC } from 'react';
import { useParams } from 'react-router';

import { useRecipe } from '../../api';
import { Image } from '../../components';
import {
  RecipeHeader,
  RecipeInstructions,
  RecipeIngredients,
  CategoryRecipes,
} from './components';

import './Recipe.css';

export const Recipe: FC = () => {
  const { id } = useParams();
  const { recipe, isLoading, isError } = useRecipe(id);

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
      ) : null}
    </article>
  );
};
