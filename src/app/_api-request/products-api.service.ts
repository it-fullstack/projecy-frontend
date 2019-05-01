import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    console.log(`in product api`);

    return this.http.get<Product[]>(environment.apiUrl + `products`);
  }

  getProduct() {

  }


  // .subscribe(
  //   (products) => {
  //     console.log(products);
  //   }
  // );

}
