import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './components/product-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductListService } from './productListService/product-list.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({ 
    declarations: [ ProductListComponent], 
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductListRoutingModule,
    ], 
    providers: [ProductListService, provideHttpClient(withInterceptorsFromDi())] })
export class ProductListModule { }
