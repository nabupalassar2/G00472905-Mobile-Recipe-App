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
} from '@ionic/angular/standalone';

type Recipe = { id: number; title: string };

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html', // <--- ВАЖНО: ссылка на свой HTML
  styleUrls: ['./home.page.scss'],
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
  ],
})
export class HomePage {
  recipes: Recipe[] = [
    { id: 1, title: 'Chicken Soup' },
    { id: 2, title: 'Pasta Carbonara' },
    { id: 3, title: 'Greek Salad' },
  ];

  favouriteIds: number[] = [];

  constructor() {
    addIcons({ heart, 'heart-outline': heartOutline, settings });
  }

  ionViewWillEnter(): void {
    this.loadFavourites();
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