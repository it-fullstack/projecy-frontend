import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "../model/product";
import { ProductBySubcategory } from "../model/productBySubcategory";

@Injectable({
  providedIn: 'root'
})



export class ProductsApiService {

  constructor(private http: HttpClient) { }

  private baseurl = `http://localhost:8080/market-place-web/products`;
  private urlProductBySubcategory = `http://localhost:8080/market-place-web/products/`;


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseurl);
  }

  getProductsBySubcatery(subcategory: string): Observable<ProductBySubcategory> {
    return this.http.get<ProductBySubcategory>(this.urlProductBySubcategory + subcategory);
  }

}
