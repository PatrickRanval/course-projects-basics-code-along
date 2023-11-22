import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
// import { DataStorageService } from "../shared/data-storage.service";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = []
  //   new Recipe(
  //     "Dave's HTML Tacos",
  //     "Dave Gray's Special HTML Tacos",
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Tripa_tacos.jpg/800px-Tripa_tacos.jpg",
  //     [
  //       new Ingredient('Chorizo', 1),
  //       new Ingredient('Corn Tortillas', 8),
  //       new Ingredient('HTML Sauce', 1)
  //     ]),
  //   new Recipe(
  //     "Dave's CSS Burger",
  //     "Dave Gray's Special CSS Burger",
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Outback_Steakhouse%2C_Nu_Sentral_P1096432-001_%2815618836743%29.jpg/600px-Outback_Steakhouse%2C_Nu_Sentral_P1096432-001_%2815618836743%29.jpg",
  //     [
  //       new Ingredient('Burger Meat', 1),
  //       new Ingredient('Bun', 2),
  //       new Ingredient('CSS Sauce', 1)
  //     ])
  // ];

  constructor(private slService:ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index:number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe:Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe:Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());  //this line
  }

  deleteRecipe(index:number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  }


