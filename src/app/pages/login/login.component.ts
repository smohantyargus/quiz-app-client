import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  formSubmit() {
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('Success');
        // console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            if (this.loginService.getUserRole() == 'ADMIN') {
              this.router.navigateByUrl('admin');
              this.loginService.loginStatusSubject.next(true);
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              this.router.navigateByUrl('user/0');
              this.loginService.loginStatusSubject.next(true);
            } else {
              this.loginService.logout();
              location.reload();
            }
          },
          (error) => {
            this.snack.open('Invalid Credentials', 'OK', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
            });
          }
        );
      },
      (error) => {
        this.snack.open('Invalid Credentials', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
