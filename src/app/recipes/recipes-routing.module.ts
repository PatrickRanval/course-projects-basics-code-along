import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { recipeResolver } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children:[
    { path: '', component: RecipeStartComponent},
    { path: 'new', component: RecipeEditComponent},
    { path: ':id', component: RecipeDetailComponent, resolve: [recipeResolver]},
    { path: ':id/edit', component: RecipeEditComponent, resolve: [recipeResolver]},
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}