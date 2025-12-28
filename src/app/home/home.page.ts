import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { heart, heartOutline, settings, alertCircle } from 'ionicons/icons'; // Added alertCircle icon
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSpinner,
} from '@ionic/angular/standalone';
import { RecipeService } from '../services/recipe.service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSpinner, // Added to imports

  ],
})
export class HomePage {
  ingredients: string = '';
  recipes: any[] = [];
  favouriteIds: number[] = [];
  
  // New state variables
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private recipeService: RecipeService) {
    addIcons({ heart, 'heart-outline': heartOutline, settings, 'alert-circle': alertCircle });
  }

  ionViewWillEnter(): void {
    this.loadFavourites();
  }

  search() {
    if (!this.ingredients.trim()) return;

    // Reset state before search
    this.isLoading = true;
    this.errorMessage = '';
    this.recipes = [];

    this.recipeService.searchRecipes(this.ingredients).subscribe({
      next: (data: any) => {
        this.recipes = data.results;
        this.isLoading = false; // Stop loading
        
        // Optional: Show message if no recipes found
        if (this.recipes.length === 0) {
          this.errorMessage = 'No recipes found for these ingredients.';
        }
      },
      error: (err: any) => {
        console.error('Error fetching recipes', err);
        this.isLoading = false; // Stop loading even on error
        this.errorMessage = 'Failed to load recipes. Please check your internet or try again later.';
      }
    });
  }

  get hasAnyFavourites(): boolean {
    return this.favouriteIds.length > 0;
  }

  isFavourite(id: number): boolean {
    return this.favouriteIds.includes(id);
  }

  toggleFavourite(id: number): void {
    if (this.isFavourite(id)) {
      this.favouriteIds = this.favouriteIds.filter(x => x !== id);
    } else {
      this.favouriteIds = [...this.favouriteIds, id];
    }
    this.saveFavourites();
  }

  private loadFavourites(): void {
    const raw = localStorage.getItem('favouriteIds');
    this.favouriteIds = raw ? (JSON.parse(raw) as number[]) : [];
  }

  private saveFavourites(): void {
    localStorage.setItem('favouriteIds', JSON.stringify(this.favouriteIds));
  }
}