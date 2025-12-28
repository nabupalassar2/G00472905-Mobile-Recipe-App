import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { heart, heartOutline, settings } from 'ionicons/icons';
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
  IonThumbnail,
  IonImg
} from '@ionic/angular/standalone';
// This import will work now if you renamed the file to recipe.service.ts
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
    IonThumbnail,
    IonImg
  ],
})
export class HomePage {
  // Variable for the ingredients input field
  ingredients: string = '';
  // Recipe array is empty initially, waiting for API data
  recipes: any[] = [];
  favouriteIds: number[] = [];

  constructor(private recipeService: RecipeService) {
    addIcons({ heart, 'heart-outline': heartOutline, settings });
  }

  // Triggered every time the page becomes active
  ionViewWillEnter(): void {
    this.loadFavourites();
  }

  // Search method (triggered by the SEARCH button)
  search() {
    if (!this.ingredients.trim()) return;

    this.recipeService.searchRecipes(this.ingredients).subscribe({
      // FIXED: Added ': any' to data
      next: (data: any) => {
        // API returns an object with a 'results' field
        this.recipes = data.results;
      },
      // FIXED: Added ': any' to err
      error: (err: any) => {
        console.error('Error fetching recipes', err);
      }
    });
  }

  // Logic for the main heart icon (header)
  get hasAnyFavourites(): boolean {
    return this.favouriteIds.length > 0;
  }

  // Check if a specific recipe is in favourites
  isFavourite(id: number): boolean {
    return this.favouriteIds.includes(id);
  }

  // Toggle favourite state (add/remove)
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