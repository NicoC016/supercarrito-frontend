import { Component, ViewChildren } from '@angular/core';
import { ClienteService } from '../services/client.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    standalone: false
})
export class ClientComponent {
  @ViewChildren('buttonClose') buttonClose!:any;
  public clients!: any;
  public form : FormGroup = new FormGroup({});
  public first = 0;
  public labelModal = 'Agregar cliente';
  public idSupplier = '';
  public isEdit = false;
  public rows = 10;
  public headers = [
      {label: 'Nombre', key: 'name'},
      {label: 'Apellido', key: 'lastName'},
      {label: 'Identificación', key: 'identification'},
      {label: 'Ciudad', key: 'city'},
      {label: 'cuil', key: 'cuil'},
      {label: 'Teléfono',  key: 'phoneNumber'},
      {label: 'Fecha de nacimiento', key: 'birthdate'},
  ]


  constructor(
    private clientServices: ClienteService,
    public formBuilder:FormBuilder,
    ) {}

  ngOnInit() {
    this.createForm();
    this.getClient();
  }

  getClient(){
    this.clientServices.getClient().subscribe(res=>{
      return this.clients = res;
  });
  }
  createForm(){
    this.form = this.formBuilder.group({
        name: new FormControl(""),
        lastName: new FormControl(""),
        identification: new FormControl(""),
        cuil: new FormControl(""),
        city: new FormControl(""),
        phoneNumber: new FormControl(""),
        birthdate: new FormControl(""),
    });
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
      return this.clients ? this.first === this.clients.length - this.rows : true;
  }

  isFirstPage(): boolean {
      return this.clients ? this.first === 0 : true;
  }

  createNewClient(){
    this.clientServices.createClient(this.form.value).subscribe(
      res =>{
        this.resetModal();
        this.buttonClose.first.nativeElement.click();
        this.getClient();
      },
      err=>err
    )
    
  }
  saveClient(){
    if(this.isEdit)return this.savedClientUpdate();
    this.createNewClient();
  }

  deleteClient(suppliersId:string | any){
      this.clientServices.deleteClient(suppliersId).subscribe(res =>{
        return this.getClient();
      },
      err=> err
    )
  }

  editClient(supplierId:string | any){
    this.idSupplier = supplierId;
    this.isEdit = true;
    this.labelModal = 'Editar cliente'
    this.clientServices.getClientById(supplierId).subscribe(res =>{
      this.form.patchValue(res);
    }, err=>{
      this.resetModal();
      this.buttonClose.first.nativeElement.click();
    });
  }

  savedClientUpdate(){
    this.clientServices.PutClient(this.idSupplier, this.form.value).subscribe(res =>{
      this.buttonClose.first.nativeElement.click();
      this.resetModal();
      return this.getClient();
    },
    err=> {
      this.buttonClose.first.nativeElement.click();
      this.resetModal();
    })
  }

  resetModal(){
      this.isEdit = false;
      this.idSupplier = '';
      this.labelModal = 'Crear cliente';
      this.createForm();
  }
}
