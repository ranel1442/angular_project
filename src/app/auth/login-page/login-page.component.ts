import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/app.component';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  

constructor(
  private api: ApiService,
  private router: Router,
  private auth: AuthService
) {}

  // the  loginForm 
  loginForm = new FormGroup({
    email: new FormControl('', {
        validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
    })
})

onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        console.log(this.loginForm.value);

        this.api.login(this.loginForm.value).subscribe({
            next: (data: User) => {
                console.log(data);
                if (data.token) this.api.setToken(data.token)
                this.router.navigate([this.auth.redirectUrl]);
            },
            error: (err) => console.log(err)
        })
    }

}
