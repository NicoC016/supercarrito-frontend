import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './components/suppliers.component';
import { SuppliersService } from './services/suppliers.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[SuppliersService]
})
export class SuppliersModule { }
