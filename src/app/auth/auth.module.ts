import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { FieldErrorComponent } from './field-error/field-error.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    SignupPageComponent,
    FieldErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
