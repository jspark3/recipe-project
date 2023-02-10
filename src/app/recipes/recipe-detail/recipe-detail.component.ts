import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;
  //Stores the recipe ID
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    //Only will work we load a detail component
    // We don't want to use this because we want to see what our id is dynamicly: => Subscription
    //const id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
        //React to a new Id
        this.id = +params['id'];
        //Set this recipe to the data reteieved from the array in the service
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onAddToShoppingList()
  {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }
}
