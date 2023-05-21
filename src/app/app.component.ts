import { AfterViewInit, Component } from '@angular/core';
import { ApiService } from './core/api.service';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';

// interFaces
export interface User {
  _id?: string | null;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  token?: string | null;
}
export interface Customer {
  _id?: string | null;
  name?: string | null;
  lastname?: string | null; 
  email?: string | null;
  phone?: string | null;
  adress?: string | null;
}

export interface Employees {
  _id?: string | null;
  fullname?: string | null;
  email?: string | null;
  phone?: string | null;
  birthday?: string | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})






export class AppComponent{
  title = 'my-project';



  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthService
) { }

loggedIn(): boolean {
  return this.auth.isLoggedIn();
}

logout() {
  this.api.deleteToken();
  this.router.navigate(['login']);
}

}
