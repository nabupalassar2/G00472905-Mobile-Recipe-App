import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonToggle,
  IonButtons,     // 
  IonBackButton,  // 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonLabel, 
    IonToggle,
    IonButtons,    // 
    IonBackButton  // 
  ],
})
export class SettingsPage {
  isMetric = true;

  constructor() {
    const saved = localStorage.getItem('unitsMetric');
    if (saved !== null) {
      this.isMetric = saved === 'true';
    }
  }

  onUnitsChanged(ev: any) {
    const isUS = ev.detail.checked;
    this.isMetric = !isUS;
    localStorage.setItem('unitsMetric', String(this.isMetric));
  }
}