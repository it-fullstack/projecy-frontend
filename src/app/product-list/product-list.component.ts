import { Component, OnInit } from '@angular/core';
import { Product } from "../model/product";
import { ProductsService } from "./products.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  parameters = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.processData(this.productsService.getParameterList).subscribe(
      () => {
        this.parameters =  this.productsService.parameterList;
        console.log(this.parameters)
      }
    );
  }

}
