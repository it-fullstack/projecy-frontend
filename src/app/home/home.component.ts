import {NgModule, Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  private ProductTypes: ProductType[] = [
    new ProductType('data','data'),
    new ProductType('data1','data1'),
  ];
  DataKind ='data';
  searchValue = '';
  getChange(kind: string) {
    this.DataKind = kind;
    console.log(this.DataKind);
  }

  myFullData = {
      data: ['abc','def','ghi'],
      data1:['xyz','asd','zxc']
  };
  constructor(){}
  ngOnInit() {}

  onInput(event): void {
    this.searchValue = event.target.value;
    console.log(this.searchValue);
  }

  handleClick($event: Event){
    if(this.searchValue == null || this.searchValue == "" || this.myFullData[this.DataKind].indexOf(this.searchValue) == -1){
      alert("Please fill the search word correctly!");
    }else{
      console.log("DataKind:"+this.DataKind+";searchValue:"+this.searchValue);
    }
  }
/*
     //SelectData为下拉菜单的数据结构   id默认为空
     @Input() selectValue = new SelectData("", "--请先选择--")
     active = "false";
 
     //下拉菜单要显示所有下拉菜单，为数组结构
     @Input() data = ['abc','def','qwe'];
     //菜单的id值，每个id唯一标识一个菜单
     @Input() dataId;
     //菜单显示的菜单名字。
     @Input() dataValue;
 
     //选择菜单事件，选择一个菜单，即把该选择的菜单发射出去
     @Output() select = new EventEmitter();
 
     //搜索过滤值
     filterValue = "";
 
     //用于显示的所有菜单 
     optionsToDisplay = [];
 
     //根据value值进行过滤
     //filterBy = "value";
     constructor(){}
     ngOnInit() {
         if ( this.data!=null &&  this.data.length > 0) {
             this.optionsToDisplay = this.data.concat();
         } else {
             
             this.optionsToDisplay = [];
         }
     }
 
     ngOnChanges() {
         this.optionsToDisplay = this.data;
     }
 
 //选中菜单时
     activeValue(e: HTMLElement, a: HTMLElement, event: Event) {
         if (a.id == null || a.id == "") {
             this.selectValue.value = a.innerText;
             this.selectValue.id = a.id;
             this.select.emit(this.selectValue);
             return;
         }
         this.selectValue.value = a.innerText;
         this.selectValue.id = a.id;
         if (e.classList.contains("open")) {
             e.classList.remove("open");
         } else {
             e.classList.add("open");
         }
         event.stopPropagation();
         this.select.emit(this.selectValue);
     }
 
 //过滤字符，进行菜单的搜索
     onFilter(event): void {
         if(this.optionsToDisplay && this.optionsToDisplay.length){
             this.optionsToDisplay.length = 0;            
         }
         let inputValue = this.trim(event.target.value.toLowerCase());
 
         //对输入的字符进行非空限制
         if (inputValue && inputValue.length) {
             this.filterValue = inputValue;
             this.optionsToDisplay = this.activateFilter();
         }
         else {
             console.log(this.optionsToDisplay);
             this.filterValue = null;
             this.optionsToDisplay = this.data.concat();
             console.log(this.optionsToDisplay);
 
         }
     }
 
    activateFilter() {
         let searchFields: string[] = this.dataValue.split(',');
         if (this.data && this.data.length) {
             return this.filter(this.data, searchFields, this.filterValue);
         }
    }
    trim(str:string):string{
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }

  filter(value: any[], fields: any[], filterValue: string) {
    let filteredItems: any[] = [];
    if(value) {
        for(let item of value) {                
            for(let field of fields) {
                if(String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                    filteredItems.push(item);
                    break;
                }
            }
        }
    }
    return filteredItems;
  }

  resolveFieldData(data: any, field: string): any {
    console.log(field);
    if(data && field) {
        if(field.indexOf('.') == -1) {
            return data[field];
        }
        else {
            let fields: string[] = field.split('.');
            let value = data;
            for(let i = 0, len = fields.length; i < len; ++i) {
                if (value == null) {
                    return null;
                }
                value = value[fields[i]];
            }
            return value;
        }
    }
    else {
        return null;
    }
  }*/
}

/*
export class SelectData {
  id: string;
  value: string;
  constructor(id: string, value: string) {
      this.id = id;
      this.value = value;
  }
}*/
export class ProductType{
  kind:string;
  name:string;
  constructor(kind: string, name: string) {
    this.kind = kind;
    this.name = name;
}
}