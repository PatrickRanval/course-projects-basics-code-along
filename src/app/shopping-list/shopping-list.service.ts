import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>
   private ingredients:Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index:number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);}
    //   Above method works but creates a lot of event emission, which can scale to preformance issues
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
    //  Above method uses spread operator ... to destructure the passed in array, and then push every item to the list.  It creates a single event emission, which is better for performance.
  }

  updateIngredient(index:number, newIngredient:Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
