import { Injectable } from '@angular/core';
import { ProductsApiService } from '../api-request/products-api.service';
import { Product } from "../model/product";
import { Card } from "../model/card";
import * as _ from 'lodash';
import * as $ from "jquery";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  subcategory = "HAVC_Fans";


  products: Product[] = [];

  attribute: [];
  parameterXML: XMLDocument;
  parameterList = [];

  productCard: Card[] = [];


  constructor(private productApi: ProductsApiService) { }
  processData(callback) {
    return this.productApi.getProductsBySubcatery(this.subcategory).pipe(
      tap(data => {
        this.products = data.products;
        this.attribute = data.attribute;
      }),
      tap(callback)
    )
  }

  getParameterList = data => {
    for (let i=0;i<this.attribute.length;i++){
      this.parameterList.push({
        "name": this.attribute[i]["name"],
        "unit": this.attribute[i]["unit"],
        "min": this.findEndPoint(this.attribute[i]["name"], "min"),
        "max": this.findEndPoint(this.attribute[i]["name"], "max")
      })
    }
  }

  getAllProductCard = data => {
    for (let i=0;i<this.products.length;i++){
      let summary = $($.parseXML(this.products[i].summary));
      let cardParameter = [];
      for (let j=0; j<this.attribute.length;j++){
        cardParameter.push({
          "name" : this.attribute[j]["name"],
          "unit": this.attribute[j]["unit"],
          "value": summary.find(this.attribute[j]["name"]).text()
        })
      }
      this.productCard.push({
        "verifiedTime": this.products[i].verifiedDate,
        "manufacturer": summary.find("manufacturer").text(),
        "model": summary.find("model").text(),
        "series": summary.find("series").text(),
        "imgUrl": summary.find("imgUrl").text(),
        "year": parseInt(summary.find("year").text()),
        "parameters": cardParameter
      })
    }
  }

  getProductCardByFilter = (parameter: []) => {
    
  }


  findEndPoint(parameter: string, direction: string): number {
    let minValue = $($.parseXML(this.products[0].summary)).find(parameter).text();
    let maxValue = $($.parseXML(this.products[0].summary)).find(parameter).text();
    if (direction == "min") {
      for (let i = 0; i < this.products.length; i++) {
        if ($($.parseXML(this.products[i].summary)).find(parameter).text() < minValue
          && $($.parseXML(this.products[i].summary)).find(parameter).text() != "") {
          minValue = $($.parseXML(this.products[i].summary)).find(parameter).text();
        }
      }
      return parseInt(minValue);
    } else if (direction == "max") {
      for (let i = 0; i < this.products.length; i++) {
        if ($($.parseXML(this.products[i].summary)).find(parameter).text() > maxValue
          && $($.parseXML(this.products[i].summary)).find(parameter).text() != "") {
          maxValue = $($.parseXML(this.products[i].summary)).find(parameter).text();
        }
      }
      return parseInt(maxValue);
    } else {
      console.log("I dont know~~")
    }
  }
}
