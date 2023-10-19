import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  recipe:Recipe;
  id:number;

  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router ) {

  }

  ngOnInit(){
    // const id = this.route.snapshot.params['id'];  //This would work if we weren't going to intrapage link
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = +params.get('id');
            this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    //Either of these work
    //this.router.navigate(['edit'], {relativeTo: this.route})
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

}
