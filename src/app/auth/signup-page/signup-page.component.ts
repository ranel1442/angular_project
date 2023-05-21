import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { LoggerService } from 'src/app/core/logger.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  constructor(
    private logger: LoggerService,
    private api: ApiService,
    private router: Router
) { }
// chaild componnent
@ViewChild('nameFieldRef') nameField!: ElementRef;

// name focus
ngAfterViewInit(): void {
  this.logger.log('ngAfterViewInit');
  // console.log('ngAfterViewInit');
  this.nameField.nativeElement.focus();
}

// form grup
signupForm = new FormGroup({
  name: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(20)]
  }),
  email: new FormControl('', {
      validators: [Validators.required, Validators.email]
  }),
  password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
  })
})

getFieldControl(field: string): FormControl {
  return this.signupForm.get(field) as FormControl;
}

// submit
onSubmit() {
  if (this.signupForm.invalid) {
      return;
  }

  console.log(this.signupForm.value);

  this.api.signup(this.signupForm.value).subscribe({
      next: (data) => {
          this.router.navigate(['login']);
      },
      error: (err) => console.log(err)
  })
}
}
