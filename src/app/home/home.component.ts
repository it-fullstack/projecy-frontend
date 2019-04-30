import {NgModule, Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  private ProductTypes: ProductType[] = [//for category select
    new ProductType('data','data'),
    new ProductType('data1','data1'),
  ];

  //category:[subcategory]
  myFullData = {
    data: ['abc','def','ghi'],
    data1:['xyz','asd','zxc']
};

  DataKind ='data';//category
  searchValue = '';//subcategory

  //select category
  getChange(kind: string) {
    this.DataKind = kind;
    console.log(this.DataKind);
  }


  constructor(){}
  ngOnInit() {}

  //input search value
  onInput(event): void {
    this.searchValue = event.target.value;
    console.log(this.searchValue);
  }

  //click the search button
  handleClick($event: Event){
    if(this.searchValue == null || this.searchValue == "" || this.myFullData[this.DataKind].indexOf(this.searchValue) == -1){
      alert("Please fill the search word correctly!");
    }else{
      console.log("DataKind:"+this.DataKind+";searchValue:"+this.searchValue);
    }
  }

}


export class ProductType{
  kind:string;
  name:string;
  constructor(kind: string, name: string) {
    this.kind = kind;
    this.name = name;
}
}