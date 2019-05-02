import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../_services/products.service';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductFormComponent implements OnInit {
  parameters = [];
  subcategory: string;
  private sub: any;

  constructor(private productsService: ProductsService, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activedRoute.params.subscribe(params => {
      this.subcategory = params["subcategory"];
      this.productsService.processData(this.productsService.getParameterList, this.subcategory).subscribe(() => this.parameters = this.productsService.parameterList)
    }
    )
  }

  getProductCardByFilter() {
    let parameterList = this.parameters;
    this.productsService.filterData(
      this.productsService.getProductCardByFilter,
      this.convertParameterListToFilterCondition(parameterList)).subscribe();
  }

  convertParameterListToFilterCondition(parameterList) {
    let filterList = {};
    filterList["sub"] = [this.productsService.subcategory];
    for (let ele of parameterList) {
      filterList[ele.name] = [ele.min, ele.max]
    }
    return filterList;
  }
}
