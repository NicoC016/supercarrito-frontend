import { Component, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ProductListService } from '../productListService/product-list.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    standalone: false
})
export class ProductListComponent {
  @ViewChildren('buttonClose') buttonClose!:any;
  public products!:any[];
  public layout: string = 'list';
  public showProducts = false;
  public form:FormGroup = new FormGroup({});
  public labelModal = 'Agregar producto';
  public idSupplier = '';
  public isEdit = false;
  public userLogged = { 
    role: '',
  };

  constructor(
    public productListService:ProductListService,
    public formBuilder: FormBuilder,
  ){}
  ngOnInit(): void {
    this.searchProduct();
    this.createForm();
    //@ts-ignore
    this.userLogged =  JSON.parse(localStorage.getItem('userData'));
  }

  createForm(){
    this.form = this.formBuilder.group({
        name: new FormControl(""),
        brand: new FormControl(""),
        category: new FormControl(""),
        codebar: new FormControl(""),
        image: new FormControl(""),
        price: new FormControl(""),
        weight: new FormControl(""),
        unity: new FormControl(""),
    });
  }

  searchProduct(){
    this.products = [];
    this.showProducts = false;
    this.productListService.getAllProduct().subscribe(res=>{
      if(res){
        this.products = res;
        this.showProducts = true;
      }
    },err=> {
      return err
    })
  }

  createNewProduct(){
    this.productListService.createProduct(this.form.value).subscribe(res =>{
      this.resetModal();
      this.buttonClose.first.nativeElement.click();
      this.searchProduct();
    },
    err=>err)
  }
  saveProduct(){
    if(this.isEdit)return this.savedProductUpdate();
    this.createNewProduct();
  }

  deleteProduct(suppliersId:string){
      this.productListService.deleteProduct(suppliersId).subscribe(res =>{
        return this.searchProduct();
      },
      err=> err)
  }

  editProduct(supplierId:string){
    this.idSupplier = supplierId;
    this.isEdit = true;
    this.labelModal = 'Editar producto'
    this.productListService.getProductById(supplierId).subscribe(res =>{
      this.form.patchValue(res);
    }, err=>{
      this.resetModal();
      this.buttonClose.first.nativeElement.click();
    });
  }

  savedProductUpdate(){
    this.productListService.PutProduct(this.idSupplier, this.form.value).subscribe(res =>{
      this.buttonClose.first.nativeElement.click();
      this.resetModal();
      return this.searchProduct();
    },
    err=> {
      this.buttonClose.first.nativeElement.click();
      this.resetModal();
    })
  }

  resetModal(){
      this.isEdit = false;
      this.idSupplier = '';
      this.labelModal = 'Crear producto';
      this.createForm();
  }
}
