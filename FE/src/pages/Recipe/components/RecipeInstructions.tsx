import { type FC } from 'react';
import './RecipeInstructions.css';

interface Props {
  recipeId: string;
  instructions: string;
}

export const RecipeInstructions: FC<Props> = ({ recipeId, instructions }) => (
  <section className="recipe-instructions">
    <h3>Instructions</h3>
    {instructions.split('\r\n').map((p, i) => (
      <p key={`${recipeId}-${i}`}>{p}</p>
    ))}
  </section>
);
