import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../_services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubCategory } from 'src/app/model/subcategory';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  cards: any;
  _subscription: any;
  subcategory: string;
  private sub: any;

  constructor(private productsService: ProductsService, private activedRoute: ActivatedRoute, private router: Router) {
    this.cards = this.productsService.productCard;
    this.productsService.observeProduct().subscribe(value => {
      this.cards = value;
    })
  }

  ngOnInit() {
    this.sub = this.activedRoute.params.subscribe(params => {
      this.subcategory = params["subcategory"];

      this.productsService.processData(this.productsService.getProductCard, this.subcategory).subscribe(
        () => {
          this.cards = this.productsService.productCard;
          // console.log("kkk")
          // console.log(this.cards);
        });
    })
  }
  handleCompare() {
    let comparedproductsId = [];
     this.cards.forEach(element => {
       if(element.checked){
         comparedproductsId.push(element.productId);
       }
     });
     this.router.navigate(['productscompare',{'comparedproductsId':comparedproductsId,'subcategeory':this.subcategory}]);
  }
}
