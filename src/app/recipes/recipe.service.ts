import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
    new Recipe(
      "Dave's HTML Tacos",
      "Dave Gray's Special HTML Tacos",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Tripa_tacos.jpg/800px-Tripa_tacos.jpg",
      [
        new Ingredient('Chorizo', 1),
        new Ingredient('Corn Tortillas', 8),
        new Ingredient('HTML Sauce', 1)
      ]),
    new Recipe(
      "Dave's CSS Burger",
      "Dave Gray's Special CSS Burger",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Outback_Steakhouse%2C_Nu_Sentral_P1096432-001_%2815618836743%29.jpg/600px-Outback_Steakhouse%2C_Nu_Sentral_P1096432-001_%2815618836743%29.jpg",
      [
        new Ingredient('Burger Meat', 1),
        new Ingredient('Bun', 2),
        new Ingredient('CSS Sauce', 1)
      ])
  ];

  constructor(private slService:ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index:number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }


}
