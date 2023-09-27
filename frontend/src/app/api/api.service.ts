import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map, switchMap, tap } from 'rxjs';
import { Config } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ApiService { 

    //Login
    constructor(private http: HttpClient, private storageService: StorageService) { }


    loginSendOTP(phone: string,deviceId: string) {
        return this.http.post(`${environment.apiUrl}/auth/sendOTP`, {
            phone,
            deviceId
        });
    }

    loginVerifyOTP(phone: string, deviceId: string, otpCode: string) {
        return this.http.post(`${environment.apiUrl}/auth/verifyOTP`, {
            phone,
            deviceId,
            otpCode
        });
    }

    async getUser() {
        const token = await this.storageService.get('apiToken');
        return this.http.get(`${environment.apiUrl}/user/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    async register(firstName: string, lastName: string, phone: string) {
        return this.http.post(`${environment.apiUrl}/auth/register`, {
            firstName,
            lastName,
            phone
        });
    }


}