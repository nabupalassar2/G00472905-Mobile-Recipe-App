import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    RouterLink,
  ],
})
export class HomePage {
  // true = favourite exists
  isFavourite = false;

  constructor() {
    const stored = localStorage.getItem('favourite');
    this.isFavourite = stored === 'true';
  }

  toggleFavourite() {
    this.isFavourite = !this.isFavourite;
    localStorage.setItem('favourite', String(this.isFavourite));
  }
}