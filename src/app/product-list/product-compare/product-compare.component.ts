import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import * as $ from "jquery";
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styleUrls: ['./product-compare.component.css']
})
export class ProductCompareComponent implements OnInit {
  products = [];
  Comparedps = [];
  tagname = [];
  productsHash: {[index:string]: string} = {};
  constructor(private productsService: ProductsService) { }

  productIdList: number[] = [10000,10001,10002];
  ngOnInit() {
    this.productsService.processData(this.productsService.getAllProductCard).subscribe(
      () => {
        this.products =  this.productsService.products;
        //console.log(this.products);
        //let parser = new DOMParser();
        //let xmlDoc = parser.parseFromString(text,"text/xml");
        // documentElement is root node
        let xmlDoc = $.parseXML(this.products[0].summary);
        let x = xmlDoc.documentElement.childNodes;
        for (let i = 0; i < x.length ;i++) {
          this.tagname.push(x[i].nodeName);
          this.productsHash[x[i].nodeName] = "";
        }
        console.log(this.tagname);

        for(let i = 0; i < this.products.length; i++){
          if(this.productIdList.indexOf(this.products[i].productId) == -1){
            break;
          }
          let sum = $($.parseXML(this.products[i].summary));  
          //console.log(sum.find(this.tagname[2]).text()); 
          let VDate = new Date(parseInt(this.products[i].verifiedDate));
          //console.log(VDate.toString());
          for(let j = 0; j < this.tagname.length; j++){
            this.productsHash[this.tagname[j]] = sum.find(this.tagname[j]).text();
          }
          //console.log(sum.find("manufacturer").text()); 
          console.log(this.productsHash);

          this.Comparedps.push(new ComparedProduct(VDate.toString(),this.productsHash));
          this.productsHash = {};
        }
        //console.log(this.Comparedps[0]);
        //console.log(this.products);
        //console.log(this.productsHash);
      }
    );
  }


}

export class ComparedProduct{
  verifiedDate: string;
  productsHash: {[index:string]: string} = {};
  constructor(verifiedDate: string,productsHash: {[index:string]: string} ) {
      this.verifiedDate = verifiedDate;
      this.productsHash = productsHash;
     }
}