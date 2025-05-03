import { type FC } from 'react';
import { Link } from 'react-router';
import { RecipeDetails } from '../../../types';

import './RecipeHeader.css';

interface Props {
  recipeId: string;
  recipe: RecipeDetails | Record<never, unknown>;
  isLoading: boolean;
  isError: boolean;
  className?: string;
}

export const RecipeHeader: FC<Props> = ({
  recipeId,
  recipe,
  isLoading,
  isError,
  className,
}) =>
  'strMeal' in recipe && !(isLoading || isError) ? (
    <header className={`recipe-header ${className}`}>
      <h2>{recipe.strMeal} Recipe</h2>
      <p className="recipe-header__country">
        <Link to={`/?a=${recipe.strArea}`}>{recipe.strArea}</Link>
      </p>
    </header>
  ) : (
    <header className={`recipe-header ${className}`}>
      <h2>Recipe {recipeId}</h2>
      <p className="recipe-header__country">{isLoading && <span>Loading…</span>}</p>
    </header>
  );
