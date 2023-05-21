import { Injectable } from '@angular/core';
import { Customer, Employees, User } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getOneProject(id: string): any {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  // the server url
  serverUrl='http://localhost:3000/';


  //Tokens = ''
  private TOKEN_KEY = 'token'
  deleteToken() {
    localStorage.removeItem(this.TOKEN_KEY);
}
  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) || '';
}
  setToken(value: string) {
    localStorage.setItem(this.TOKEN_KEY, value);
  }

  // Customers
  getCustomers(): Observable<Array<Customer>> {
    return this.GET<Array<Customer>>(`customers`);
}
getOneCustomer(id: string): Observable<Customer> {
  return this.GET<Customer>(`customers/${id}`);
}

addCustomer(customer: Customer): Observable<Customer> {
  return this.POST<Customer>('customers', customer);
}
deleteCustomer(id: string): Observable<Customer> {
  return this.http.delete<Customer>(
      `${this.serverUrl}customers/${id}`,
      {
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': this.getToken()
          }
      }
  )
}
updateCustomer(id: string, customer: Customer): Observable<Customer> {
  return this.http.put<Customer>(
      `${this.serverUrl}customers/${id}`,
      customer,
      {
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': this.getToken()
          }
      }
  )
}

// employees
getEmployees(): Observable<Array<Employees>> {
  return this.GET<Array<Employees>>(`employees`);
}
deleteEmployees(id: string): Observable<Employees> {
  return this.http.delete<Employees>(
      `${this.serverUrl}employees/${id}`,
      {
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': this.getToken()
          }
      }
  )
}

// POST and GET metod/schema
POST<DynamicType>(endpoint: string, data: DynamicType): Observable<DynamicType> {
  return this.http.post<DynamicType>(
      `${this.serverUrl}${endpoint}`,
      data,
      {
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': this.getToken()
          }
      }
  )
}
GET<DynamicType>(endpoint: string): Observable<DynamicType> {
  return this.http.get<DynamicType>(
      `${this.serverUrl}${endpoint}`,
      {
          headers: {
              'x-auth-token': this.getToken()
          }
      }
  )
}


// login page API
login(user: User): Observable<User> {
  return this.POST<User>('users/login', user);
}
// sing up
signup(user: User): Observable<User> {
  return this.POST<User>('users/signup', user);
}
  
}
