import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCompareComponent } from './product-list/product-compare/product-compare.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatTooltipModule, MatGridListModule } from '@angular/material';
import { ProductCardComponent } from './product-list/product-card/product-card.component';
import { ProductBoardComponent } from './product-list/product-board/product-board.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductListComponent,
    ProductCompareComponent,
    ProductDetailComponent,
    ErrorpageComponent, 
    ProductCardComponent, ProductBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule, 
    MatCardModule, 
    MatTooltipModule, 
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
