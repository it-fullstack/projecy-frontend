import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../products.service";
import { Card } from "../../model/card";


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  parameters = [];
  submitted = false;
  cards: Card[];
  
  onSubmit() { this.submitted = true; }
  
  
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.processData(this.productsService.getParameterList).subscribe(
      () => {
        this.parameters =  this.productsService.parameterList;
      }
    );
  }
  // test(){
  //   console.log(this.parameters);
  // }

  testFilter = {
    "year":[2010,2020],
    "airflow":[6,1000],
    "sub":["HAVC_Fans"]
  }

  getProductCardByFilter(){
    this.productsService.filterData(this.productsService.getProductCardByFilter, this.testFilter).subscribe(
      () => {
        this.cards = this.productsService.productCard;
        console.log(this.cards);
      }
    )
  }
}
