import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  isAdmin: any;

  ngOnInit(): void {
    this.isAdmin = this.loginService.getUserRole() === 'ADMIN';
  }
}
