import { Component, OnInit } from '@angular/core';
import { Card } from "../../model/card";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {


  productId = 1;
  manufacturer = "Big Ass";
  series = "Haiku H Series";
  model = "S3150-S0-BC-04-01-C-01";

  useType = "Commercial";
  application = "Indoor";
  mountingLocation = "Roof";
  modelYear = 2016;


  cardParameter = [
    {"name": "airflow", "unit": "CFW", "value": 5},
    {"name": "airflow", "unit": "CFW", "value": 5},
    {"name": "airflow", "unit": "CFW", "value": 5},
    {"name": "airflow", "unit": "CFW", "value": 5}
  ];

  constructor() { }

  ngOnInit() {
    
  }

}
