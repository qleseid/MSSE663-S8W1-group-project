import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';

interface Recipe {
  name: string;
  directions: string;
  ingredients: string;
}

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipeList$: Observable<Recipe[]>;
  selectedRecipe: Recipe;
  
  constructor(
    private recipeService: RecipeService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.recipeList$ = this.recipeService.getRecipes();
  }

  selectRecipe(recipe: Recipe): void {
    console.log(recipe);
    this.recipeService.selectedRecipe(recipe);
  }

  addRecipe(): void {
    this.router.navigate(['/createRecipe']);
  }
}
