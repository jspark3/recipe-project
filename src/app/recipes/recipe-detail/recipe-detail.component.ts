import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router){

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

  //Will navigate us to the edit recipe page when clicked
  onEditRecipe()
  {
    //This is how I will probably navigate using this method
    this.router.navigate(['edit'], {relativeTo: this.route});

    //This is an Alternative way to navigate
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onAddToShoppingList()
  {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }
}
