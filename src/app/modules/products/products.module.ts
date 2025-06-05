import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products.component';
import { ProductService } from './services/product.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({ declarations: [ProductsComponent], imports: [CommonModule,
        ReactiveFormsModule,
        ProductsRoutingModule,
        TableModule,
        ButtonModule,
        InputTextModule], providers: [
        ProductService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class ProductsModule { }
