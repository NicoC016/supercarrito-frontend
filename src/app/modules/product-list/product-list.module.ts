import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './components/product-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { ProductListService } from './productListService/product-list.service';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({ 
    declarations: [ ProductListComponent], 
    imports: [
        CommonModule,
        StyleClassModule,
        ReactiveFormsModule,
        ProductListRoutingModule,
        TagModule,
        ButtonModule,
        InputTextModule,
        DataViewModule,
    ], 
    providers: [ProductListService, provideHttpClient(withInterceptorsFromDi())] })
export class ProductListModule { }
