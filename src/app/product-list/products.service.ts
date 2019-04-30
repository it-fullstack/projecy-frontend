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

  filterData(callback, filter) {
    return this.productApi.getProductByFilter(filter).pipe(
      tap(data => {
        this.products = data;
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
        "max": this.findEndPoint(this.attribute[i]["name"], "max"), 
        "minLimit": this.findEndPoint(this.attribute[i]["name"], "min"), 
        "maxLimit": this.findEndPoint(this.attribute[i]["name"], "max")
      })
    }
  }

  getProductCard = data => {
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

  getProductCardByFilter = data => {
    let attribute = [];
    $($.parseXML(this.products[0].subCategory["parameters"])).children().children().each(
      (i, element) => {
        attribute.push({
          "name": $(element).children("name").text(),
          "unit": $(element).children("unit").text()
        })
      }
    );
    // console.log(attribute);
    for (let i=0;i<this.products.length;i++){
      let summary = $($.parseXML(this.products[i].summary));
      let cardParameter = [];
      for (let j=0; j<attribute.length;j++){
        cardParameter.push({
          "name": attribute[j]["name"], 
          "unit": attribute[j]["unit"], 
          "value": summary.find(attribute[j]["name"]).text()
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


  findEndPoint(parameter: string, direction: string): number {
    // console.log("k")
    // console.log(this.products);
    let initValue = parseInt($($.parseXML(this.products[0].summary)).find(parameter).text());
    if (direction == "min") {
      let minValue = initValue
      for (let i = 0; i < this.products.length; i++) {
        let currentValue = parseInt($($.parseXML(this.products[i].summary)).find(parameter).text());;
        if ( currentValue < minValue ) {
          minValue = currentValue;
        }
      }
      return minValue;
    } else if (direction == "max") {
      let maxValue = initValue;
      for (let i = 0; i < this.products.length; i++) {
        let currentValue = parseInt($($.parseXML(this.products[i].summary)).find(parameter).text());
        if (currentValue > maxValue ) {
          maxValue = currentValue;
        }
      }
      return maxValue;
    } else {
      console.log("I dont know~~")
    }
  }
}
