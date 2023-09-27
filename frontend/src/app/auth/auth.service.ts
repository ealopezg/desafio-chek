import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Device } from '@capacitor/device';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly apiService: ApiService, private storageService: StorageService,private router: Router) {
  }

  async isLoggedIn() {
    return (await this.storageService.get('apiToken')) != undefined;
  }

  async logOut() {
    await this.storageService.set('apiToken', undefined).then(async () => {
      await this.router.navigate(['/start']);
    });
  }

  async setToken(token: string) {
    await this.storageService.set('apiToken', token)
  }
  
  async loginSendOTP(phone: string) {
    const deviceId = await Device.getId();
    return this.apiService.loginSendOTP(phone, deviceId.identifier).subscribe();
  }

  async loginVerifyOTP(phone: string, otpCode: string) {
    const deviceId = await Device.getId();
    return this.apiService.loginVerifyOTP(phone, deviceId.identifier, otpCode).subscribe(async (data: any) => {
      await this.setToken(data.token).then(async () => {
        await this.router.navigate(['/tabs/home']);
      })
    });
  }

  async register(name: string, lastName: string, phone: string) {
    return (await this.apiService.register(name, lastName, phone)).subscribe(async (data: any) => {
      await this.router.navigate(['/start']);
    });
  }

}
