import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipesChangedSubscription: Subscription;
  private dataStorageSub:Subscription;

  constructor(private recipeService: RecipeService,
              private router:Router,
              private route:ActivatedRoute,
              private dataStorageService:DataStorageService){
  }

  //   ngOnInit() {
  // //   this.dataStorageSub = this.dataStorageService.fetchRecipes().subscribe({
  // //     next: (recipes) => {
  // //       console.log(recipes);
  // //       this.recipeService.setRecipes(recipes);
  // //     },
  // //     error: (error) => {
  // //       console.error('An error occurred:', error);
  // //     }}
  // //   );
  //   this.recipes = this.recipeService.getRecipes();
  //   this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe(
  //     (recipes: Recipe[]) => {
  //       this.recipes = recipes;
  //     }
  //   );
  // }

  //This is Modified around a deprecation. Still needs work. Same issue as SeedLibrary of not refreshing on first push.
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy(){
  //   this.dataStorageSub.unsubscribe();
    this.recipesChangedSubscription.unsubscribe();
  }


  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
