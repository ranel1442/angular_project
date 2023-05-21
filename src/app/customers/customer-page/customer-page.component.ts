import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/app.component';
import { ApiService } from 'src/app/core/api.service';



@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit{
  constructor(private api: ApiService) { }

  customers: Array<Customer> = []
  


addCustomer=new FormGroup({
    name: new FormControl('', {
        validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256)
        ]
    }),
    lastname : new FormControl('', {
        validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256)
        ]
    }),
    email : new FormControl('', {
        validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(256),
            Validators.email
        ]
    }),
    phone: new FormControl('', {
        validators: [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(13),
           
        ]
    }),
    adress: new FormControl('', {
        validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
           
        ]
    }),
})
// get customer
getCustomers() {
  this.api.getCustomers().subscribe({
      next: (data: Array<Customer>) => {
          this.customers = data;
      },
      error: (err) => console.log(err)
  })
}
ngOnInit(): void {
  this.getCustomers();
}

// on submit
onSubmit() {
  if (this.addCustomer.invalid) {
      return;
  }

  this.api.addCustomer(this.addCustomer.value).subscribe({
      next: (data: Customer) => {
          this.addCustomer.reset();
          this.getCustomers();
      },
      error: (err) => console.log(err)
  })
}

// delete customer
onDelete(customer: Customer) {
  if (!customer._id) {
      return;
  }

  this.api.deleteCustomer(customer._id).subscribe({
      next: (data: Customer) => {
          this.getCustomers();
      },
      error: (err) => console.log(err)
  })
}




}
