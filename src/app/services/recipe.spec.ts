import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // Ключ из задания
  private apiKey = '70759a4f7911402abcc53d3c51d3b759'; 
  private baseUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) { }

  // 1. Поиск рецептов по ингредиентам
  // Параметры согласно заданию: query и apiKey
  searchRecipes(ingredients: string): Observable<any> {
    const url = `${this.baseUrl}/complexSearch?query=${ingredients}&apiKey=${this.apiKey}&number=10`;
    return this.http.get(url);
  }

  // 2. Получение полной информации о рецепте по ID
  getRecipeDetails(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}/information?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}