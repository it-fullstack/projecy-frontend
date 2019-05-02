import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';
import { Product } from '../model/product';


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
