import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonToggle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonToggle],
})
export class SettingsPage {
  // Default is true (Metric system)
  isMetric = true;

  constructor() {
    const saved = localStorage.getItem('unitsMetric');
    // If nothing is saved (first run), default to true (Metric)
    if (saved !== null) {
      this.isMetric = saved === 'true';
    }
  }

  onUnitsChanged(ev: any) {
    const isUS = ev.detail.checked; // If checked, user wants US units
    this.isMetric = !isUS;          // So Metric becomes false
    localStorage.setItem('unitsMetric', String(this.isMetric));
  }
}