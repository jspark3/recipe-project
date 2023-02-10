import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";
import { Recipe } from "./recipe.model";

import { Injectable } from "@angular/core";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Schnitzel Recipe', 
                   'Best Easy to make Schnitzel Recipe', 
                   'https://www.daringgourmet.com/wp-content/uploads/2018/01/Jagerschnitzel-12-cropped-edited-768x557.jpg', 
                   [
                        new Ingredient('Pork', 4),
                        new Ingredient('Eggs', 2),
                        new Ingredient ('Breadcrumbs', 1),
                        new Ingredient ('French Fries', 20)
                   ]),
        new Recipe('Home Made Burger Recipe', 
                   'Tasty Burger!', 
                   'https://i0.wp.com/www.aspicyperspective.com/wp-content/uploads/2020/05/Best-Hamburger-Patty-Recipe-14.jpg?resize=650%2C882&ssl=1',  
                    [
                        new Ingredient('Ground Chuch', 2),
                        new Ingredient('Saltine Crackers', 1),
                        new Ingredient ('Egg', 1),
                        new Ingredient('Worcestershire Sauce', 1),
                   ]),
      ];


    constructor(private shoppinglistService: ShoppingListService){}

    getRecipes()
    {
        return this.recipes.slice(); //new array as a copy
    }

    //Will retrun the recipy from the index of the array
    getRecipe(id: number)
    {
        return this.recipes[id];
    }

    addToShoppingList(ingredients: Ingredient[])
    {
        this.shoppinglistService.addMultipulIngredients(ingredients)
    }
}