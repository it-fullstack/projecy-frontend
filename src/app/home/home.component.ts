import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { Router } from '@angular/router';
import { CategoryService } from '../_services/category.service';
import { Category } from '../model/category';
import { ProductsService } from '../_services/products.service';
import { FormControl } from '@angular/forms';
import { SubCategory } from '../model/subcategory';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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



  myControl = new FormControl();

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private userService: UsersService,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.getCategoriesAndSubCategories();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.map.get(this.cate).filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {

    if (this.map.get(this.cate).indexOf(this.myControl.value) < 0) {
      alert(`Please fill the search word correctly!`);
    } else {
      // send data in server
      this.productService.choosenSub = this.subCate;
      // this.router.navigate([`productslist/productBySub`], { queryParams: { sub: this.subCate } });
      this.router.navigate(['productslist/productBySub/', this.myControl.value]);

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
        this.cate = this.categories[0].categoryName;
        console.log(this.categories);
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
        const list: string[] = [];
        if (data) {
          data.forEach(sub => {
            list.push(sub.subCategoryName);
          });

        }
        this.map.set(categoryName, list);
      },
      () => { },
      () => {
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      }
    );
  }


}
