import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api/api.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService) { }

  step: number = 0;
  ngOnInit() {
    this.step = 0;
  }
 
  @Input() phone: string = "";
  @Input() acceptTerms: boolean = false;
  otpCode = new FormControl('');

  async sendNumber() {
    await this.authService.loginSendOTP(this.phone);
    this.step = 1;
  }

  async verifyOTP() {
    await this.authService.loginVerifyOTP(this.phone, this.otpCode.value as string);
  }


}
