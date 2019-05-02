import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductsService } from '../../_services/products.service';
import { Router, ActivatedRoute } from '@angular/router'


export interface ProductList {
  subcategoryName: string,
  productList: {
    productId: number,
    productName: string
  }
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  subcategory: string;
  private sub: any;

  subcategory_display: string;
  productName = new FormControl();
  allProductList: ProductList[] = [];
  productList = [];
  subcategoryList = [];
  filteredOptions: Observable<ProductList[]>;
  productId: number;

  constructor(private productsService: ProductsService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activedRoute.params.subscribe(params => {
      this.subcategory = params["subcategory"];
      this.productsService.processAllData(this.productsService.getSearchBarReady).subscribe(
        () => {
          this.allProductList = this.productsService.productOptionsForSearchBar;
          this.productList = this.extractProductByCategory(this.allProductList, this.subcategory);
          this.subcategoryList = this.extractSubcategory(this.allProductList);
          this.subcategory_display = this.subcategoryList[0];
        }
      )
    }
    )
    this.filteredOptions = this.productName.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): ProductList[] {
    const filterValue = value.toLowerCase();
    return this.productList.filter(option => option.productName.toLowerCase().includes(filterValue));
  }

  handleSubmit() {
    this.productId = this.getProductIdByProductName(this.productList, this.productName.value);
    this.router.navigate(['productslist/', this.productId]);
  }

  extractProductByCategory(allProductList, subcategory) {
    let productList = [];
    allProductList.forEach(element => {
      if (element.subcategoryName == subcategory) productList.push(element.productList)
    });
    return productList;
  }
  extractSubcategory(productList) {
    let subcategoryList = [];
    productList.forEach(element => {
      if (!subcategoryList.includes(element.subcategoryName)) subcategoryList.push(element.subcategoryName)
    });
    return subcategoryList;
  }
  getProductIdByProductName(productList, productName): number {
    let productId;
    productList.forEach(element => {
      if (element.productName == productName)
        productId = element.productId;
    });
    return productId;
  }
  changeProductList(){
    this.productList = this.extractProductByCategory(this.allProductList, this.subcategory);
    this.subcategoryList = this.extractSubcategory(this.allProductList);
    this.subcategory_display = this.subcategoryList[0];
  }
}
