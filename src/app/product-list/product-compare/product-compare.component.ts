import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import * as $ from "jquery";

@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styleUrls: ['./product-compare.component.css']
})
export class ProductCompareComponent implements OnInit {

  products = [];
  Comparedps = [];
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.processData(this.productsService.getAllProductCard).subscribe(
      () => {
        this.products =  this.productsService.products;
        for(let i = 0; i < this.products.length; i++){
          let sum = $($.parseXML(this.products[i].summary));
          //console.log(sum.find("manufacturer").text());
          let VDate = new Date(parseInt(this.products[i].verifiedDate));
          //console.log(VDate.toString());
          this.Comparedps.push(new ComparedProduct(VDate.toString(),sum.find("manufacturer").text(),sum.find("series").text(),sum.find("model").text(),
          sum.find("usetype").text(),sum.find("application").text(),sum.find("mountainLocation").text(),sum.find("year").text(),
          sum.find("airflow").text(),sum.find("max-power").text(),sum.find("max-speed").text(),sum.find("fan-diameter").text(),sum.find("brand").text()));
        }
        console.log(this.Comparedps);
        //console.log(this.products);
      }
    );
  }


}

export class ComparedProduct{
  verifiedDate: string;
  manufacturer: string;
  series: string;
  model: string;
  usetype: string;
  application: string;
  mountainLocation: string;
  year: string;
  airflow: string;
  max_power: string;
  max_speed: string;
  fan_diameter: string;
  brand: string;
  constructor(verifiedDate: string,manufacturer: string,series: string,model: string,usetype: string,application: string,mountainLocation: string,year: string, airflow: string,
    max_power: string, max_speed: string, fan_diameter: string, brand: string) {
      this.verifiedDate = verifiedDate;
      this.manufacturer = manufacturer;
      this.series = series;
      this.model = model;
      this.usetype = usetype;
      this.application = application;
      this.mountainLocation = mountainLocation;
      this.year = year;
      this.airflow = airflow;
      this.max_power = max_power;
      this.max_speed = max_speed;
      this.fan_diameter = fan_diameter;
      this.brand = brand;
     }
}