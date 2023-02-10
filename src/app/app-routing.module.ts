import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

//Array of js objest with routes
const routes: Routes = [
  //pathMatch => only redirect if the full path is empty
  { path: '/', redirectTo: '/recipes', pathMatch: 'full' },
  {path: '/recipes', component: RecipesComponent },
  {path: '/shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

//Provide and bound all routes we want to use
export class AppRoutingModule { 


}
