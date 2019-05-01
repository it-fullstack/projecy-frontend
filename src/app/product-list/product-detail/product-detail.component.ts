import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../products.service";
import { Product } from "../../model/product";
import { ProductDetail } from "../../model/productDetail";
import { ActivatedRoute } from '@angular/router';
import * as $ from "jquery";


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product[];

  productId: number;
  private sub: any;
  productDetail: ProductDetail = <ProductDetail>{};
  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.productsService.digDetails(this.productsService.getProductDetail, this.productId).subscribe(
        () => {this.productDetail = this.productsService.productDetail; console.log(this.productDetail);}
      )
   });
  }

}
