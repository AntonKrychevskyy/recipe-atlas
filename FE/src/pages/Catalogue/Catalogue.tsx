import { type FC } from 'react';
import { useSearchParams } from 'react-router';
import { useRecipes } from '../../api';
import { useCatalogueHeading } from './hooks';
import { RecipeCard } from './components';

import './Catalogue.css';

export const Catalogue: FC = () => {
  const [searchParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const heading = useCatalogueHeading(searchParamsObject);
  const { recipes, error, isLoading, isError, isFetched } =
    useRecipes(searchParamsObject);

  return (
    <article className="frame-grid">
      <h2 className="catalogue__heading">{heading}</h2>
      {isLoading && <p>Loading…</p>}
      {isError && <p>Error: {error?.message}</p>}
      {isFetched && (
        <ul className="catalogue__grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </ul>
      )}
    </article>
  );
};
