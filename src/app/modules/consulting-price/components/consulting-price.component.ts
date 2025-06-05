import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../products/services/product.service';

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
      err
    })
  }
}
