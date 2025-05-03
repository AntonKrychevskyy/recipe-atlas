import { type FC } from 'react';
import { Link } from 'react-router';

import { Image } from '../../../components';
import { Flag } from './Flag';
import { RecipeDetails } from '../../../types';

import './RecipeCard.css';

interface Props {
  recipe: RecipeDetails;
}

export const RecipeCard: FC<Props> = ({ recipe }) => (
  <section className="recipe-card">
    <Link to={`/${recipe.idMeal}`} className="recipe-card__link">
      <Image src={recipe.strMealThumb} className="recipe-card__image" />
      <Flag area={recipe.strArea} size={24} style="flat" className="recipe-card__flag" />
    </Link>
    <h3 className="recipe-card__title">
      <Link to={`/${recipe.idMeal}`} className="recipe-card__link">
        {recipe.strMeal}
      </Link>
    </h3>
  </section>
);
