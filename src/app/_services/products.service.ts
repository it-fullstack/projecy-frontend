import { Injectable } from '@angular/core';

import { ProductsApiService } from '../api-request/products-api.service';
import { Product } from "../model/product";
import { Card } from "../model/card";
import { ProductDetail } from "../model/productDetail";
import * as _ from 'lodash';
import * as $ from "jquery";
import { tap } from "rxjs/operators";
import { Subject, from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  choosenSub: string;


  subcategory = "HAVC_Fans";

  products: Product[] = [];
  attribute: [];
  parameterXML: XMLDocument;
  parameterList = [];
  productCard: Card[] = [];
  productCardSub: Subject<Card[]> = new Subject<Card[]>();
  productId: number;
  productDetail: ProductDetail;
  productOptionsForSearchBar = [];

  constructor(private productApi: ProductsApiService) { }

  observeProduct(): Observable<Card[]> {
    return this.productCardSub.asObservable();
  }
  processData(callback, subCategory) {
    return this.productApi.getProductsBySubcatery(subCategory).pipe(
      tap(data => {
        this.products = data.products;
        this.attribute = data.attribute;
      }),
      tap(callback)
    )
  }
  filterData(callback, filter) {
    return this.productApi.getProductByFilter(filter).pipe(
      tap(data => { this.products = data; }),
      tap(callback)
    )
  }
  digDetails(callback, productId: number) {
    return this.productApi.getProductById(productId).pipe(
      tap(data => this.products = data),
      tap(callback)
    )
  }
  processAllData(callback) {
    return this.productApi.getProducts().pipe(
      tap(data => this.products = data),
      tap(callback)
    )

  }

  getParameterList = data => {
    this.parameterList = [];
    for (let i = 0; i < this.attribute.length; i++) {
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
    this.productCard = [];
    for (let i = 0; i < this.products.length; i++) {
      let summary = $($.parseXML(this.products[i].summary));
      let cardParameter = [];
      for (let j = 0; j < this.attribute.length; j++) {
        cardParameter.push({
          "name": this.attribute[j]["name"],
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
        "parameters": cardParameter,
        "productId": this.products[i].productId
      })
    }
  }

  getProductCardByFilter = data => {
    this.productCard = [];
    let attribute = [];
    $($.parseXML(this.products[0].subCategory["parameters"])).children().children().each(
      (i, element) => {
        attribute.push({
          "name": $(element).children("name").text(),
          "unit": $(element).children("unit").text()
        })
      }
    );
    for (let i = 0; i < this.products.length; i++) {
      let summary = $($.parseXML(this.products[i].summary));
      let cardParameter = [];
      for (let j = 0; j < attribute.length; j++) {
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
        "parameters": cardParameter,
        "productId": this.products[i].productId
      })
    }
    this.productCardSub.next(this.productCard);
  }

  getProductDetail = data => {
    let attribute = [];
    let product = this.products[0];
    let summary = $($.parseXML(product.summary));
    let seriesInformation = $($.parseXML(product.productDetails));
    let contact = $($.parseXML(product.productContact)).children("contact");
    let productParameter = [];
    $($.parseXML(product.subCategory["parameters"])).children().children().each(
      (i, element) => {
        attribute.push({
          "name": $(element).children("name").text(),
          "unit": $(element).children("unit").text()
        })
      }
    );
    for (let j = 0; j < attribute.length; j++) {
      productParameter.push({
        "name": attribute[j]["name"],
        "unit": attribute[j]["unit"],
        "value": summary.find(attribute[j]["name"]).text()
      })
    }
    this.productDetail = {
      "manufacturer": summary.find("manufacturer").text(),
      "series": summary.find("series").text(),
      "model": summary.find("model").text(),
      "useType": summary.find("usetype").text(),
      "application": summary.find("application").text(),
      "mountingLocation": summary.find("mountainLocation").text(),
      "year": summary.find("year").text(),
      "parameters": productParameter,
      "seriesInformation": seriesInformation.find("PRODUCT-DETAILS").text(),
      "name": contact.children("SALES-REPRESENTATIVE").children("Name").text(),
      "phone": contact.children("SALES-REPRESENTATIVE").children("Phone").text(),
      "email": contact.children("SALES-REPRESENTATIVE").children("Email").text(),
      "web": contact.children("SALES-REPRESENTATIVE").children("Web").text(),
      "department": contact.children("MANUFACTURER").children("Department").text(),
      "manufacturerPhone": contact.children("MANUFACTURER").children("Phone").text(),
      "manufacturerEmail": contact.children("MANUFACTURER").children("Email").text(),
      "manufacturerWeb": contact.children("MANUFACTURER").children("Web").text()
    }
  }

  getSearchBarReady = data => {
    this.productOptionsForSearchBar = [];
    this.products.forEach(
      product => {
        let subcategory = product.subCategory["subCategoryName"];
        this.productOptionsForSearchBar.push({
          subcategoryName: subcategory,
          productList: {
            productId: product.productId,
            productName: product.productName
          }
        })
      }
    )
  }

  findEndPoint(parameter: string, direction: string): number {
    // console.log("k")
    // console.log(this.products);
    let initValue = parseInt($($.parseXML(this.products[0].summary)).find(parameter).text());
    if (direction == "min") {
      let minValue = initValue
      for (let i = 0; i < this.products.length; i++) {
        let currentValue = parseInt($($.parseXML(this.products[i].summary)).find(parameter).text());;
        if (currentValue < minValue) {
          minValue = currentValue;
        }
      }
      return minValue;
    } else if (direction == "max") {
      let maxValue = initValue;
      for (let i = 0; i < this.products.length; i++) {
        let currentValue = parseInt($($.parseXML(this.products[i].summary)).find(parameter).text());
        if (currentValue > maxValue) {
          maxValue = currentValue;
        }
      }
      return maxValue;
    } else {
      console.log("I dont know~~")
    }
  }
}