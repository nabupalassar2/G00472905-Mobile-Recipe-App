import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonBackButton, IonList, IonItem, IonLabel, 
  IonButton, IonIcon, IonSpinner 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonButtons, IonBackButton, IonList, 
    IonItem, IonLabel, IonButton, IonIcon, IonSpinner
  ]
})
export class RecipeDetailsPage {
  recipe: any = null;
  isMetric: boolean = true;
  isFavourite: boolean = false;
  favouriteIds: number[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    addIcons({ heart, 'heart-outline': heartOutline });
  }

  // IMPORTANT: Using ionViewWillEnter to ensure settings are reloaded every time
  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    
    // Read settings every time the view is entered
    const savedUnit = localStorage.getItem('unitsMetric');
    // Logic: if explicitly 'false', then it is US. Otherwise (null or 'true') it is Metric.
    this.isMetric = savedUnit === 'false' ? false : true;

    this.loadFavourites();

    if (id) {
      // Always reload recipe to ensure data consistency
      this.loadRecipe(id);
    }
  }

  loadRecipe(id: string) {
    this.isLoading = true;
    this.recipeService.getRecipeDetails(id).subscribe({
      next: (data: any) => {
        this.recipe = data;
        this.checkIfFavourite();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading recipe details', err);
        this.isLoading = false;
      },
    });
  }

  toggleFavourite() {
    if (!this.recipe) return;

    if (this.isFavourite) {
      this.favouriteIds = this.favouriteIds.filter(id => id !== this.recipe.id);
      this.isFavourite = false;
    } else {
      this.favouriteIds.push(this.recipe.id);
      this.isFavourite = true;
    }
    this.saveFavourites();
  }

  private loadFavourites() {
    const raw = localStorage.getItem('favouriteIds');
    this.favouriteIds = raw ? JSON.parse(raw) : [];
  }

  private saveFavourites() {
    localStorage.setItem('favouriteIds', JSON.stringify(this.favouriteIds));
  }

  private checkIfFavourite() {
    if (this.recipe) {
      this.isFavourite = this.favouriteIds.includes(this.recipe.id);
    }
  }
  
  changeUnits() {
    this.isMetric = !this.isMetric;
    localStorage.setItem('unitsMetric', String(this.isMetric));
  }
}