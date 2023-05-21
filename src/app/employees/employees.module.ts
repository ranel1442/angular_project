import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeePageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EmployeesModule { }
