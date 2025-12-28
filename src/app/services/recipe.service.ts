import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // API Key from the project requirements
  private apiKey = '70759a4f7911402abcc53d3c51d3b759'; 
  private baseUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) { }

  // 1. Search recipes by ingredients
  // Parameters: query and apiKey
  searchRecipes(ingredients: string): Observable<any> {
    const url = `${this.baseUrl}/complexSearch?query=${ingredients}&apiKey=${this.apiKey}&number=10`;
    return this.http.get(url);
  }

  // 2. Get full recipe details by ID
  getRecipeDetails(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}/information?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}