import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { ProductCompareComponent } from './product-list/product-compare/product-compare.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'productslist/productBySub/:subcategory', component: ProductListComponent },
  { path: 'productslist/:id', component: ProductDetailComponent },
  { path: 'productscompare', component: ProductCompareComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorpageComponent }

];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
