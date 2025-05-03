import { type FC } from 'react';
import { Link } from 'react-router';
import { useRecipes } from '../../../api';

import './CategoryRecipes.css';

interface Props {
  category: string;
}

export const CategoryRecipes: FC<Props> = ({ category }) => {
  const { recipes, error, isLoading, isError } = useRecipes({ c: category });

  return (
    <aside className="recipe__category-recipes">
      <h3>
        <Link to={`/?c=${category}`}>{category} Recipes</Link>
      </h3>
      {!(isLoading || isError) ? (
        <ul className="recipe__category-recipes-list">
          {recipes.slice(0, 10).map(({ idMeal, strMeal }) => (
            <li key={`${category}-${idMeal}`}>
              <Link to={`/${idMeal}`}>{strMeal}</Link>
            </li>
          ))}
        </ul>
      ) : (
        [isLoading && <p>Loading…</p>, isError && <p>Error: {error?.message}</p>]
      )}
    </aside>
  );
};
