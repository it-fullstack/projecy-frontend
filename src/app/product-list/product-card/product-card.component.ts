import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../products.service";
import { Card } from "../../model/card";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  cards: Card[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.processData(this.productsService.getAllProductCard).subscribe(
      data => {
        this.cards = this.productsService.productCard;
    }
    )
  }







}
