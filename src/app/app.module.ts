import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

//module of components
import { EmployeeModule } from '@modules/employee/employee.module';
import { HomeModule } from '@modules/home/home.module';
import { BillModule } from '@modules/bill/bill.module';
import { ProductsModule } from '@modules/products/products.module';
import { LoginModule } from '@modules/login/login.module';
import { ClientModule } from '@modules/client/client.module';
import { SuppliersModule } from '@modules/suppliers/suppliers.module';
import { ConsultingPriceModule } from '@modules/consulting-price/consulting-price.module';
import { ProductListModule } from '@modules/product-list/product-list.module';
import { NavbarComponent } from './extra/navbar/components/navbar.component';
import { FlashMessageModule } from 'flash-message-sc';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    EmployeeModule,
    BillModule,
    LoginModule,
    ProductsModule,
    ClientModule,
    SuppliersModule,
    ConsultingPriceModule,
    ProductListModule,
    NavbarComponent,
    FlashMessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
