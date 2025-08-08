import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../products/services/product.service';
import { FlashMessageService } from 'flash-message-sc';

@Component({
    selector: 'app-consulting-price',
    templateUrl: './consulting-price.component.html',
    styleUrls: ['./consulting-price.component.scss'],
    standalone: false
})
export class ConsultingPriceComponent {
  form:FormGroup = new FormGroup({});
  public products!:any[];
  public layout: string = 'list';
  public showProducts = false;

  constructor(
    public formBuilder:FormBuilder,
    public productService:ProductService,
    private flashMessageService: FlashMessageService
  ){}
  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
        codebar: new FormControl(""),
    });
  }

  searchProduct(){
    this.products = [];
    this.showProducts = false;
    this.productService.searchProduct(this.form.value.codebar).subscribe(res=>{
      if(res){
        this.products.push(res);
        this.showProducts = true;
      }
    },err=> {
      this.flashMessageService.show({message: 'Error al buscar el producto', type: 'error', duration: 3000});
    })
  }
}
