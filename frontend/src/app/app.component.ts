import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  async ngOnInit(): Promise<void> {
    if (await this.authService.isLoggedIn()) {
      await this.router.navigate(['/tabs/home']);
    }
    else {
      await this.router.navigate(['/start']);
    }
  }
}
