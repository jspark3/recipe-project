import { Component,OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[] ;
  subscription: Subscription;

  constructor(private recipeService: RecipeService, 
              private router: Router, 
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    
    this.recipes = this.recipeService.getRecipes();
  }
  onRecipeSelected(recipe: Recipe)
  {
    // this.recipeWasSelected.emit(recipe);
  }

  onNewRecipe()
  {
    //By adding router we are able to navigate to a location with a method called
    //Since we are only going to access this link within the recipes component we dont need '/new'
    //So we iniciate rout thrugh activeatedRoute and will append new to the reletive route that we are on
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
