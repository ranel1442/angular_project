import { Component } from '@angular/core';
import { Employees } from 'src/app/app.component';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent {
  constructor(private api: ApiService) { }

  employees: Array<Employees> = []
  
  geteEmployees() {
    this.api.getEmployees().subscribe({
        next: (data: Array<Employees>) => {
            this.employees = data;
        },
       error:(err)=>console.log(err)
    })
}

onDelete(employees: Employees) {
  if (!employees._id) {
      return;
  }

  this.api.deleteEmployees(employees._id).subscribe({
      next: (data: Employees) => {
          this.geteEmployees();
      },
      error: (err) => console.log(err)
  })
}
}
