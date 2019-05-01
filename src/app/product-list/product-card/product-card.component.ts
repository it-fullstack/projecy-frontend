import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../_services/products.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  cards: any;
  _subscription: any;
  subcategory = "HAVC_Fans";

  constructor(private productsService: ProductsService) {
    this.cards = this.productsService.productCard;
    this.productsService.observeProduct().subscribe(value => {
      this.cards = value;
    })
  }

  ngOnInit() {
    this.productsService.processData(this.productsService.getProductCard, this.subcategory).subscribe(() => this.cards = this.productsService.productCard);
  }
}
