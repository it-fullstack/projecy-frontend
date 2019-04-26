import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsApiService } from '../api-request/products-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private productApi: ProductsApiService) { }

  getProducts() {
    console.log(`in product service`);
    this.productApi.getProducts();
  }

  getProduct() {

  }


}
