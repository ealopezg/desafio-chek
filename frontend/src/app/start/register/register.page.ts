import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private readonly authService: AuthService) { }


  @Input() phone: string = '';
  @Input() name: string = '';
  @Input() lastName: string = '';
  ngOnInit() {
  }

  register() {
    this.authService.register(this.name, this.lastName, this.phone);
  }

}
