import type { Recipe } from "../../types/Recipe";
import ModalLayout from "./ModalLayout";

type RecipeModalProps = {
  recipe: Recipe;
};

export default function RecipeModal({ recipe }: RecipeModalProps) {
  return (
    <ModalLayout>
      <div>{recipe.name}</div>
    </ModalLayout>
  );
}
