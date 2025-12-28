import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
  ],
  templateUrl: './favourites.page.html',
})
export class FavouritesPage {
  isFavourite = false;

  constructor() {
    const stored = localStorage.getItem('favourite');
    this.isFavourite = stored === 'true';
  }
}

