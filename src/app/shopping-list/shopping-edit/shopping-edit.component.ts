import { Component, ElementRef, ViewChild, EventEmitter, Output, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{
  @ViewChild('nameInput', {static: false}) nameInputRef : ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef : ElementRef;

  constructor(private shoppinglistservice: ShoppingListService){}

  ngOnInit(): void {
    
  }

  onAddItem()
  {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient (ingName, ingAmount);

    this.shoppinglistservice.addIngredient(newIngredient);
  }
}
