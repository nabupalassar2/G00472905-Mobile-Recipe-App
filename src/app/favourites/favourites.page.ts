import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItem, IonLabel, IonButtons, IonBackButton, IonButton, 
  IonIcon, IonThumbnail, IonImg
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
    IonBackButton, IonButton, IonIcon, IonThumbnail, IonImg
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
      ids.forEach(id => {
        this.recipeService.getRecipeDetails(id.toString()).subscribe({
          next: (data) => {
            this.favouriteRecipes.push(data);
          },
          error: (err) => console.error(err)
        });
      });
      this.isLoading = false;
    }
  }

  removeFromFavourites(id: number): void {
    // Remove from local array
    this.favouriteRecipes = this.favouriteRecipes.filter(r => r.id !== id);
    
    // Update LocalStorage
    const raw = localStorage.getItem('favouriteIds');
    let ids = raw ? (JSON.parse(raw) as number[]) : [];
    ids = ids.filter(x => x !== id);
    localStorage.setItem('favouriteIds', JSON.stringify(ids));
  }
}