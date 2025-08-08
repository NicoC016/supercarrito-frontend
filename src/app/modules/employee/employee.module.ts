import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './components/employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeService } from './services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    SharedModule,
  ],
  providers:[EmployeeService]
})
export class EmployeeModule { }
