import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { forkJoin } from 'rxjs'; // Import forkJoin
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItem, IonLabel, IonButtons, IonBackButton, IonButton, 
  IonIcon, IonThumbnail, IonImg, IonSpinner // Added IonSpinner
} from '@ionic/angular/standalone';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonList, IonItem, IonLabel, IonButtons, 
    IonBackButton, IonButton, IonIcon, IonThumbnail, IonImg, IonSpinner
  ],
})
export class FavouritesPage {
  favouriteRecipes: any[] = [];
  isLoading = false;

  constructor(private recipeService: RecipeService) {
    addIcons({ trash });
  }

  ionViewWillEnter(): void {
    this.loadFavourites();
  }

  loadFavourites() {
    this.favouriteRecipes = [];
    const raw = localStorage.getItem('favouriteIds');
    const ids = raw ? (JSON.parse(raw) as number[]) : [];

    if (ids.length > 0) {
      this.isLoading = true;
      
      // Create an array of Observables (requests)
      const requests = ids.map(id => this.recipeService.getRecipeDetails(id.toString()));

      // forkJoin waits for ALL requests to complete
      forkJoin(requests).subscribe({
        next: (results: any[]) => {
          this.favouriteRecipes = results;
          this.isLoading = false; // Only stop loading when EVERYTHING is ready
        },
        error: (err) => {
          console.error('Error loading favourites', err);
          this.isLoading = false;
        }
      });

    } else {
      this.isLoading = false;
    }
  }

  removeFromFavourites(id: number): void {
    // Remove from local UI list immediately
    this.favouriteRecipes = this.favouriteRecipes.filter(r => r.id !== id);
    
    // Update LocalStorage
    const raw = localStorage.getItem('favouriteIds');
    let ids = raw ? (JSON.parse(raw) as number[]) : [];
    ids = ids.filter(x => x !== id);
    localStorage.setItem('favouriteIds', JSON.stringify(ids));
  }
}