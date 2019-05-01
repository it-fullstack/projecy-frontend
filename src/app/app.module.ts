import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field'

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
    RegisterComponent

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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
