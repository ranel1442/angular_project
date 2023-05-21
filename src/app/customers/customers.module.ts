import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { RouterModule } from '@angular/router';
import { CusomerDetailsComponent } from './cusomer-details/cusomer-details.component';



@NgModule({
  declarations: [
    CustomerPageComponent,
    EditCustomerComponent,
    CusomerDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    CustomerPageComponent
  ]
})
export class CustomersModule { }
