import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  constructor(private http: HttpClient) { }

  baseurl = `http://localhost:8080/market-place-web/products`;

  getProducts() {
    console.log(`in product api`);

    this.http.get(this.baseurl).subscribe(
      (products) => {
        console.log(products);
      }
    );
  }

  getProduct() {

  }


}
