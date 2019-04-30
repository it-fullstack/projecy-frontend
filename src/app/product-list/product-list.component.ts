import { Component, OnInit } from '@angular/core';
import { Product } from "../model/product";
import { ProductsService } from "./products.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {


  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    
  }

}
