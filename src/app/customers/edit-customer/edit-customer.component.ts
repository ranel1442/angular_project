import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Customer } from 'src/app/app.component';
import { ApiService } from 'src/app/core/api.service';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  constructor(
    private api: ApiService,
    private activeRoute: ActivatedRoute,
    private router: Router
) { }
customer: Customer | null = null;


  // form grup
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



ngOnInit(): void {
  this.activeRoute.paramMap.pipe(
      switchMap(params => {
          const id = params.get('id') as string;
          return this.api.getOneCustomer(id);
      })
  ).subscribe({
      next: (data: Customer) => {
          this.customer = data;
          const name = data.name || '';
          const lastname = data.lastname || '';
          const email = data.email || '';
          const phone = data.phone || '';
          const adress = data.adress || '';
          this.addCustomer.get('name')?.setValue(name);
          this.addCustomer.get('lastname')?.setValue(lastname);
          this.addCustomer.get('email')?.setValue(email);
          this.addCustomer.get('phone')?.setValue(phone);
          this.addCustomer.get('adress')?.setValue(adress);

      },
      error: (err) => console.log(err)
  })
}

onSubmit() {
  if (this.addCustomer.invalid || !this.customer?._id) {
      return;
  }

  this.api.updateCustomer(this.customer?._id, this.addCustomer.value).subscribe({
      next: (data: Customer) => {
          this.router.navigate(['customers']);
      },
      error: (err) => console.log(err)
  })
}
}
