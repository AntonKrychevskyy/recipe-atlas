import { type FC } from 'react';
import { Link } from 'react-router';
import { RecipeDetails } from '../../../types';

import './RecipeIngredients.css';

interface Props {
  recipe: RecipeDetails;
}

export const RecipeIngredients: FC<Props> = ({ recipe }) => {
  const { idMeal } = recipe;
  const ingredients: Array<[string, string]> = Array(20)
    .fill(null)
    .map((_, i) => {
      const key1 = `strIngredient${i + 1}` as keyof RecipeDetails;
      const key2 = `strMeasure${i + 1}` as keyof RecipeDetails;
      const ingredient = recipe[key1] as string | null;
      const measure = recipe[key2] as string | null;

      if (ingredient && ingredient.trim()) {
        return [ingredient, measure];
      }

      return null;
    })
    .filter((item): item is [string, string] => Array.isArray(item));

  return (
    <section className="recipe-ingredients">
      <h3>Ingredients</h3>
      <dl className="recipe-ingredients__grid">
        {ingredients.map(([item, measure], i) => (
          <div key={`${idMeal}-ing${i}`} className="recipe-ingredients__row">
            <dt className="recipe-ingredients__name">
              <Link to={`/?i=${item}`}>{item}</Link>
            </dt>
            <dd className="recipe-ingredients__measure">{measure}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
