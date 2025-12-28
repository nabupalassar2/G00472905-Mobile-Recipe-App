import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // To get ID from URL
import { RecipeService } from '../services/recipe.service';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonBackButton, 
  IonImg, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonButton,
  IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons, 
    IonBackButton, 
    IonImg, 
    IonList, 
    IonItem, 
    IonLabel,
    IonButton,
    IonIcon
  ]
})
export class RecipeDetailsPage implements OnInit {
  recipe: any = null; // Will hold the full recipe data
  isMetric: boolean = true; // Default to Metric
  isFavourite: boolean = false; // Is this recipe in favourites?
  favouriteIds: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    addIcons({ heart, 'heart-outline': heartOutline });
  }

  ngOnInit() {
    // 1. Get the ID from the URL (route)
    const id = this.route.snapshot.paramMap.get('id');
    
    // 2. Check User Settings (Metric vs US)
    const savedUnit = localStorage.getItem('unitsMetric');
    // If saved is 'false', then it is US. Otherwise default to true.
    this.isMetric = savedUnit === 'false' ? false : true;

    // 3. Load Favourites list
    this.loadFavourites();

    // 4. Fetch Recipe Details from API
    if (id) {
      this.recipeService.getRecipeDetails(id).subscribe({
        next: (data: any) => {
          this.recipe = data;
          // Check if this specific recipe is in the favourite list
          this.checkIfFavourite();
        },
        error: (err: any) => {
          console.error('Error loading recipe details', err);
        }
      });
    }
  }

  // --- Favourite Logic ---

  toggleFavourite() {
    if (!this.recipe) return;

    if (this.isFavourite) {
      // Remove ID
      this.favouriteIds = this.favouriteIds.filter(id => id !== this.recipe.id);
      this.isFavourite = false;
    } else {
      // Add ID
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
}