import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsApiService } from '../_api-request/products-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  choosenSub: string;


  constructor(private productApi: ProductsApiService) { }

  getProducts() {
    console.log(`in product service`);
    this.productApi.getProducts().subscribe(
      res => {
        console.log(res);
      }
    );
  }

  getProduct() {

  }


}
