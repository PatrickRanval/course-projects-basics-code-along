import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { Observable, map, tap, take, exhaustMap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http:HttpClient, private recipesService:RecipeService, private authService:AuthService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
    .put(
      'https://ng-course-recipe-book-9246b-default-rtdb.firebaseio.com/recipes.json',
      recipes).subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
  return this.http
  .get<Recipe[]>(
    'https://ng-course-recipe-book-9246b-default-rtdb.firebaseio.com/recipes.json'
    ).pipe(
    map((recipes) => {
    return recipes.map((recipe) => {
      return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
    });
    }),
    tap(recipes => {
      this.recipesService.setRecipes(recipes)
    })
    );
}
}



  // fetchRecipes(){
  //   this.http
  //   .get<Recipe[]>(
  //     'https://ng-course-recipe-book-9246b-default-rtdb.firebaseio.com/recipes.json')
  //     .pipe(map(recipes => {
  //       return recipes.map(recipe => {
  //         return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
  //       });
  //     }))
  //     .subscribe(recipes => {
  //       this.recipesService.setRecipes(recipes);
  //     });
  // }

