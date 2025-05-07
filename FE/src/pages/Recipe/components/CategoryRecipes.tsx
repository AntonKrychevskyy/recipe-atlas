import { type FC } from 'react';
import { Link } from 'react-router';

import { useRecipes } from '../../../api';
import { useToastOnError } from '../../../hooks';
import { Spinner } from '../../../components';

import './CategoryRecipes.css';

interface Props {
  category: string;
}

export const CategoryRecipes: FC<Props> = ({ category }) => {
  const { recipes, error, isLoading, isError } = useRecipes({ c: category });
  useToastOnError(`${category} recipes (most popular)`, isError, error);

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
        [isLoading && <Spinner />, isError && <p>Error: {error?.message}</p>]
      )}
    </aside>
  );
};
