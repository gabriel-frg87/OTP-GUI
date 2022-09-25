import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public employees?: Employee[];
  public otpPassword?: OtpPassword;
  public isValid: any;

  constructor(http: HttpClient, private myService: ApiService) {
    http.get<Employee[]>('https://localhost:7060/api/Employee').subscribe(result => {
      this.employees = result;
    }, error => console.error(error));
  }

  title = 'Employees';

  onClickGetOtp(name: string, length: number) {
    this.myService.getOtp(name, length).subscribe(result => {
      this.otpPassword = result;
      this.isValid = null;
    }, error => console.error(error));    
  }

  onClickVerifyOtp(otp : string, name: string, length: number) {
    this.myService.currentlyValid(otp, name, length).subscribe(result => {
      this.isValid = result;
    }, error => console.error(error));
  }
}

interface Employee {
  id: number;
  userName: string;
  logIn: Date;
  logOut: Date;
}

interface OtpPassword {
  password: string;
  remainingSeconds: number;
}
