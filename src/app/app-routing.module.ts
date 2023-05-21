import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { AuthService } from './core/auth.service';
import { CustomerPageComponent } from './customers/customer-page/customer-page.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { CusomerDetailsComponent } from './customers/cusomer-details/cusomer-details.component';
import { EmployeePageComponent } from './employees/employee-page/employee-page.component';

const routes: Routes = [
  {path:'login',component:LoginPageComponent},
  {path:'', redirectTo:'/login',pathMatch:'full'},
  { path: 'signup', component: SignupPageComponent },
  {path:'',
canActivateChild:[AuthService],
children:[
  { path: 'customers', component: CustomerPageComponent },
  { path: 'edit-customers/:id', component: EditCustomerComponent },
  { path: 'details-customers/:id', component: CusomerDetailsComponent },
  { path: 'employees', component: EmployeePageComponent },

]
}  

//   {
//     path: '',
//     // redirectTo: '/home',
//     // pathMatch: 'full',
//     canActivateChild: [AuthService],
//     children: [
//         { path: 'customer', component: CustomerPageComponent },
     
//     ]
// },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
