import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub:Subscription;
  private dataStorageSub:Subscription;

  constructor(
    private dataStorageService:DataStorageService,
    private authService:AuthService){}

    ngOnInit(): void {
        this.authService.user.subscribe(user => {
          this.isAuthenticated = !!user;  // bang bang equivalent to !user ? false : true;
        }

        );
    }


  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
    // An Alternative and extrordinarily hacky solution:
    // this.recipeService.setRecipes(this.recipes);
    // this.dataStorageSub = this.dataStorageService.fetchRecipes().subscribe({
    //   next: (recipes) => {
    //     console.log(recipes);
    //     this.recipeService.setRecipes(recipes);
    //   },
    //   error: (error) => {
    //     console.error('An error occurred:', error);
    //   }}
    // );
    // this.recipes = this.recipeService.getRecipes();
    // this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(){
    this.dataStorageSub.unsubscribe();
    this.userSub.unsubscribe();
    // this.recipesChangedSubscription.unsubscribe();
  }

}

