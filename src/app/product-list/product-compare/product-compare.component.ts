import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/_services/products.service';
import * as $ from "jquery";
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styleUrls: ['./product-compare.component.css']
})
export class ProductCompareComponent implements OnInit {
  products = [];//all the products
  Comparedps = [];//array of ComparedProduct, will be displayed in the page
  tagname = [];//array of tags' name
  productsMap: {[index:string]: string} = {};//index:tag;value:tagvalue in summary xml
  constructor(private productsService: ProductsService,private activedRoute: ActivatedRoute) { }
  private sub: any;
  productIdList: number[] = [];//compared productId
  ngOnInit() {
    this.productIdList = [];
    this.sub = this.activedRoute.params.subscribe(params => {
    console.log(params);
    for (var val in params) {
      this.productIdList.push(Number(params[val]));
     }
     console.log(this.productIdList);
    });
    this.productsService.processData(this.productsService.getProductCard, `HAVC_Fans`).subscribe(
      () => {
        this.products = this.productsService.products;//get products[]
        //console.log(this.products);
        //let parser = new DOMParser();
        //let xmlDoc = parser.parseFromString(text,"text/xml");
        // documentElement is root node
        let xmlDoc = $.parseXML(this.products[0].summary);//convert summary to xml
        let x = xmlDoc.documentElement.childNodes;//x is the child node
        for (let i = 0; i < x.length; i++) {//initialize tagname and productsMap
          this.tagname.push(x[i].nodeName);
          this.productsMap[x[i].nodeName] = "";
        }
        console.log(this.tagname);

        for (let i = 0; i < this.products.length; i++) {//only display the productsId in productIdList[]
          if (this.productIdList.indexOf(this.products[i].productId) == -1) {
            console.log("not exist " + typeof(this.productIdList[i]));
            console.log(this.productIdList);

            continue;
          }
          let sum = $($.parseXML(this.products[i].summary));//XML to jquery obj
          //console.log(sum.find(this.tagname[2]).text());
          let VDate = new Date(parseInt(this.products[i].verifiedDate));//verifiedDate from string to Date
          //console.log(VDate.toString());
          for (let j = 0; j < this.tagname.length; j++) {//update productsMap[] k-v
            this.productsMap[this.tagname[j]] = sum.find(this.tagname[j]).text();
          }
          //console.log(sum.find("manufacturer").text());
          //console.log(this.productsMap);
          this.Comparedps.push(new ComparedProduct(VDate.toString(), this.productsMap));//update Comparedps[]
          this.productsMap = {};//reset
        }
        //console.log(this.Comparedps[0]);
        //console.log(this.products);
        //console.log(this.productsHash);
      }
    );
  }


}

export class ComparedProduct {
  verifiedDate: string;
  productsMap: { [index: string]: string } = {};
  constructor(verifiedDate: string, productsMap: { [index: string]: string }) {
    this.verifiedDate = verifiedDate;
    this.productsMap = productsMap;
  }
}

