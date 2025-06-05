import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login.component';
import { LoginService } from './providers/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


@NgModule({ declarations: [LoginComponent], imports: [CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule], providers: [LoginService, provideHttpClient(withInterceptorsFromDi())] })
export class LoginModule { }
