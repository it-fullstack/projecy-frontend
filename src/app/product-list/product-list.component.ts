import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../_services/products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {


  selectedSub: string;
  subject: any;

  constructor(private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subject = this.route.queryParams.subscribe(
      param => {
        this.selectedSub = param[`sub`];
        console.log(this.selectedSub);
      }
    );
  }

  getProducts() {
    this.productService.getProducts();
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

}
