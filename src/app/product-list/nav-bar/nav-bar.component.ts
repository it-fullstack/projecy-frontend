import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  category = "Mechenical";
  subcategory: string;
  private sub: any;

  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.subcategory = params["subcategory"];
    })
  }

}
