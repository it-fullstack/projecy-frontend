import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { Router } from '@angular/router';
import { CategoryService } from '../_services/category.service';
import { Category } from '../model/category';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  categories: Category[] = [];

  map = new Map();

  cate = ''; // category
  subCate = ''; // subcategory



  constructor(private userService: UsersService,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.getCategoriesAndSubCategories();


  }

  // select category
  getChange(kind: string) {
    this.cate = kind;
  }

  // input search value
  onInput(event): void {
    this.subCate = event.target.value;
  }

  // click the search button
  handleClick($event: Event) {
    if (this.subCate == null || this.subCate === ``) {
      alert(`Please fill the search word correctly!`);
    } else {
      // send data in server
      this.productService.choosenSub = this.subCate;
      this.router.navigate([`productslist`], { queryParams: { sub: this.subCate } });

    }
  }


  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

  getCategoriesAndSubCategories() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      () => { },
      () => {
        for (const val of this.categories) {
          this.getAllSubCategories(val.categoryName);
        }
      }

    );

  }

  getAllSubCategories(categoryName: string) {
    this.categoryService.getAllSubCategories(categoryName).subscribe(
      data => {
        this.map.set(categoryName, data);
        console.log(this.map);
      }
    );
  }


}
