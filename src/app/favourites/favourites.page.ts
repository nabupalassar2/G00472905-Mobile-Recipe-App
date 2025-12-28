import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

type Recipe = { id: number; title: string };

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html', // <--- ВАЖНО: ссылка на свой HTML
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
  ],
})
export class FavouritesPage {
  allRecipes: Recipe[] = [
    { id: 1, title: 'Chicken Soup' },
    { id: 2, title: 'Pasta Carbonara' },
    { id: 3, title: 'Greek Salad' },
  ];

  favouriteIds: number[] = [];
  favouriteRecipes: Recipe[] = [];

  constructor() {
    addIcons({ trash });
  }

  ionViewWillEnter(): void {
    this.loadFavourites();
    this.favouriteRecipes = this.allRecipes.filter(r => this.favouriteIds.includes(r.id));
  }

  removeFromFavourites(id: number): void {
    this.favouriteIds = this.favouriteIds.filter(x => x !== id);
    localStorage.setItem('favouriteIds', JSON.stringify(this.favouriteIds));
    this.favouriteRecipes = this.allRecipes.filter(r => this.favouriteIds.includes(r.id));
  }

  private loadFavourites(): void {
    const raw = localStorage.getItem('favouriteIds');
    this.favouriteIds = raw ? (JSON.parse(raw) as number[]) : [];
  }
}