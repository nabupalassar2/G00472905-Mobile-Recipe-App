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
  // true = Metric, false = US
  isMetric = true;

  constructor() {
    const saved = localStorage.getItem('unitsMetric');
    if (saved !== null) {
      this.isMetric = saved === 'true';
    }
  }

  onUnitsChanged(ev: any) {
    this.isMetric = !!ev.detail.checked;
    localStorage.setItem('unitsMetric', String(this.isMetric));
  }
}