import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor (private route: ActivatedRoute) {}

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
        console.log(this.isEditMode);
      }
    );
  }

}
