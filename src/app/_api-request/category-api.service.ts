import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { SubCategory } from '../model/subcategory';


@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
  constructor(private http: HttpClient) { }


  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiUrl + `categories`);
  }


  getAllSubCategories(categoryName: string): Observable<SubCategory[]> {
    console.log(`in api`);
    return this.http.get<SubCategory[]>(environment.apiUrl + `subcategory/` + categoryName );
  }

}
