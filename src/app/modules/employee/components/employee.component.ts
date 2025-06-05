import { Component, ViewChildren } from '@angular/core';
import {EmployeeService} from'../services/employee.service'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss'],
    standalone: false
})
export class EmployeeComponent {
    @ViewChildren('buttonClose') buttonClose!:any;
    public employee!: any;
    public form : FormGroup = new FormGroup({});
    public first = 0;
    public labelModal = 'Agregar empleado';
    public idSupplier = '';
    public isEdit = false;
    public rows = 10;

    constructor(
        private employeeService: EmployeeService,
        public formBuilder:FormBuilder,
    ) {}

    ngOnInit() {
        this.createForm();
        this.getEmployee();
    }

    createForm(){
        this.form = this.formBuilder.group({
            name: new FormControl(""),
            lastName: new FormControl(""),
            identification: new FormControl(""),
            city: new FormControl(""),
            phoneNumber: new FormControl(""),
            birthdate: new FormControl(""),
        });
    }

    getEmployee(){
        this.employeeService.getEmployee().subscribe(res=>{
            this.employee = res;
        });
    }

    createNewEmployee(){
        this.employeeService.createEmployee(this.form.value).subscribe(res =>{
            this.resetModal();
            this.buttonClose.first.nativeElement.click();
            this.getEmployee();
        })
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event:any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        return this.employee ? this.first === this.employee.length - this.rows : true;
    }

    isFirstPage(): boolean {
        return this.employee ? this.first === 0 : true;
    }

    saveEmployee(){
        if(this.isEdit)return this.savedEmployeeUpdate();
        this.createNewEmployee();
    }

    deleteEmployee(suppliersId:string){
        this.employeeService.deleteSupplier(suppliersId).subscribe(res =>{
          return this.getEmployee();
        },
        err=> err)
    }
    
    editEmployee(supplierId:string){
      this.idSupplier = supplierId;
      this.isEdit = true;
      this.labelModal = 'Editar empleado'
      this.employeeService.getEmployeeById(supplierId).subscribe(res =>{
        this.form.patchValue(res);
      }, err=>{
        this.resetModal();
        this.buttonClose.first.nativeElement.click();
      });
    }
    
    savedEmployeeUpdate(){
      this.employeeService.PutEmployee(this.idSupplier, this.form.value).subscribe(res =>{
        this.resetModal();
        this.buttonClose.first.nativeElement.click();
        return this.getEmployee();
      },
      err=> {
        this.buttonClose.first.nativeElement.click();
        this.resetModal();
      })
    }

    resetModal(){
        this.isEdit = false;
        this.idSupplier = '';
        this.labelModal = 'Crear empleado';
        this.createForm();
    }
}
