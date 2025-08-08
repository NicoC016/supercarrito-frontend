import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultingPriceRoutingModule } from './consulting-price-routing.module';
import { ConsultingPriceComponent } from './components/consulting-price.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({ 
    declarations: [
        ConsultingPriceComponent
    ], 
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ConsultingPriceRoutingModule
    ], 
    providers: [provideHttpClient(withInterceptorsFromDi())] })
export class ConsultingPriceModule { }
