import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public otpPassword?: OtpPassword;
  public isValid?: boolean;

  constructor(private httpClient: HttpClient) { }


  public getOtp(name: string, length: number): Observable<OtpPassword> {
    return this.httpClient.get<OtpPassword>('https://localhost:7060/api/TOTP/user/' + name + '/time/' + length);
  }

  public currentlyValid(otp: string, name: string, length: number) {
    return this.httpClient.get<boolean>('https://localhost:7060/api/TOTP/verify/' + otp + '/' + name + '/' + length)
  }

}

interface OtpPassword {
  password: string;
  remainingSeconds: number;
}
