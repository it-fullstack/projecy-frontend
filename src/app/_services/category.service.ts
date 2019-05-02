import { Injectable } from '@angular/core';
import { CategoryApiService } from '../_api-request/category-api.service';
import { tap } from 'rxjs/operators';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { SubCategory } from '../model/subcategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private categoryApi: CategoryApiService) { }

  getAllCategories(): Observable<Category[]> {
    return this.categoryApi.getAllCategories()
      .pipe();
  }

  getAllSubCategories(categoryName: string): Observable<SubCategory[]> {
    return this.categoryApi.getAllSubCategories(categoryName).pipe();
  }




}
