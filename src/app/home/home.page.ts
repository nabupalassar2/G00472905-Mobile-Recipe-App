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
  ],
})
export class HomePage {
  ingredients: string = '';
  recipes: any[] = [];
  favouriteIds: number[] = [];

  constructor(private recipeService: RecipeService) {
    addIcons({ heart, 'heart-outline': heartOutline, settings });
  }

  // Reload favourites every time the view is entered
  ionViewWillEnter(): void {
    this.loadFavourites();
  }

  search() {
    if (!this.ingredients.trim()) return;

    this.recipeService.searchRecipes(this.ingredients).subscribe({
      next: (data: any) => {
        this.recipes = data.results;
      },
      error: (err: any) => {
        console.error('Error fetching recipes', err);
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