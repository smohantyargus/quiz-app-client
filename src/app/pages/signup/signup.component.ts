import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public user = {
    userName: '',
    password: '',
    fName: '',
    lname: '',
    email: '',
    phone: '',
  };

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  formSubmit() {
    this.userService.addUser(this.user).subscribe(
      (data) => {
        // console.log(data);
        this.router.navigateByUrl('login');
        this.snack.open('User Registered', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.log(error);
        this.snack.open('Something went wrong!', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
