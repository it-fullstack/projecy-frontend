import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCompareComponent } from './product-list/product-compare/product-compare.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { AlertComponent } from './alert/alert.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatTooltipModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatExpansionModule,
  MatDividerModule,
  MatToolbarModule
} from '@angular/material';
import { ProductCardComponent } from './product-list/product-card/product-card.component';
import { ProductFormComponent } from './product-list/product-form/product-form.component';
import { Ng5SliderModule } from 'ng5-slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchBarComponent } from './product-list/search-bar/search-bar.component';
import { NavBarComponent } from './product-list/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    HomeComponent,
    ProductListComponent,
    ProductCompareComponent,
    ProductDetailComponent,
    ErrorpageComponent,
    RegisterComponent,
    ProductCardComponent,
    ProductFormComponent,
    SearchBarComponent, NavBarComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTooltipModule,
    MatGridListModule,
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatToolbarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
