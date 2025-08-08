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
    public employees!: any;
    public form : FormGroup = new FormGroup({});

    public labelModal = 'Agregar empleado';
    public idSupplier = '';
    public isEdit = false;

    public headers = [
        {label: 'Nombre', key: 'name'},
        {label: 'Apellido', key: 'lastName'},
        {label: 'Identificación', key: 'identification'},
        {label: 'Ciudad', key: 'city'},
        {label: 'Teléfono',  key: 'phoneNumber'},
        {label: 'Fecha de nacimiento', key: 'birthdate'},
    ]

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
            this.employees = res;
        });
    }

    createNewEmployee(){
        this.employeeService.createEmployee(this.form.value).subscribe(res =>{
            this.resetModal();
            this.buttonClose.first.nativeElement.click();
            this.getEmployee();
        })
    }
    saveEmployee(){
        if(this.isEdit)return this.savedEmployeeUpdate();
        this.createNewEmployee();
    }

    deleteEmployee(suppliers:any){
        this.employeeService.deleteSupplier(suppliers.id).subscribe(res =>{
          return this.getEmployee();
        },
        err=> err)
    }
    
    editEmployee(suppliers:any){
      this.idSupplier = suppliers.id;
      this.isEdit = true;
      this.labelModal = 'Editar empleado'
      this.employeeService.getEmployeeById(suppliers.id).subscribe(res =>{
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
      	});
    }

    resetModal(){
        this.isEdit = false;
        this.idSupplier = '';
        this.labelModal = 'Crear empleado';
        this.createForm();
    }
}
