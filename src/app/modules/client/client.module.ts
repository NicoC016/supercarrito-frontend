import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './components/client.component';
import { ClienteService } from './services/client.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule,
    ReactiveFormsModule,
  ],
  providers:[ClienteService],
})
export class ClientModule { }
