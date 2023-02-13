import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  //Id of the recipe
  id : number;
  //Check to see if in edit mode or in edit or new mode
  //false is new true is edit
  isEditMode = false;
  recipeForm: FormGroup;

  constructor (private route: ActivatedRoute
             , private recipeService: RecipeService, 
               private Router: Router) {}

  ngOnInit(): void {
    //checks route parameters and subscribe to dynamicly change id and isEditmode
    this.route.params.subscribe(
      (params: Params) => {
        //Checks the id of the recipy in service through ActivatedRout
        this.id = +params['id'];
        //Throught the same logic if the id is present, then it is edit mode
        // if the id is null, then it is new mode.
        this.isEditMode = params['id'] != null;
        //We can check this through console.log
        this.initForm();
        console.log(this.isEditMode);
        
      }
    );
  }

  private initForm()
  {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    if(this.isEditMode)
    {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.descrtiption;
      if (recipe['ingredients'])
      {
        for(let ingredient of recipe.ingredients)
        {
          recipeIngredients.push(
            new FormGroup(
              {
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              }
            )
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name':new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });

  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index : number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get controls()
  {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  onSubmit()
  {
    //const newRecipe = new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'], this.recipeForm.value['imagePath'], this.recipeForm.value['ingredients']);
    if(this.isEditMode)
    {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancle();
  }

  onCancle()
  {
    this.Router.navigate(['../'], {relativeTo:this.route});
  }
}
