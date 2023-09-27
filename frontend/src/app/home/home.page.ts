import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { User } from '../auth/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  user: any = {
    firstName: '',
    lastName: '',
    phone: '',
    accounts: []
  }

  showBalance: boolean = true;
  constructor(private readonly apiService: ApiService) {

  }
  async ngOnInit(): Promise<void> {
    (await this.apiService.getUser()).subscribe((data) => {
      this.user = data;
    })
  }



}
