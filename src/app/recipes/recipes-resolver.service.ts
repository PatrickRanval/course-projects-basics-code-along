import { ResolveFn } from "@angular/router";
import { Recipe } from "./recipe.model";
import { inject } from "@angular/core";
import { RecipeService } from "./recipe.service";
import { DataStorageService } from "../shared/data-storage.service";

export const recipeResolver: ResolveFn<Recipe[]> = () => {
  const recipes = inject(RecipeService).getRecipes();
  if (recipes.length === 0) {
    return inject(DataStorageService).fetchRecipes() || [];
  } else {
    return recipes;
  }
}
