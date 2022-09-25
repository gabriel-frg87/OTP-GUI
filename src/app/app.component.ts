import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public employees?: Employee[];

  constructor(http: HttpClient) {
    http.get<Employee[]>('https://localhost:7060/api/Employee').subscribe(result => {
      this.employees = result;
    }, error => console.error(error));
  }

  title = 'Employees';
}

interface Employee {
  id: number;
  userName: string;
  logIn: Date;
  logOut: Date;
}
