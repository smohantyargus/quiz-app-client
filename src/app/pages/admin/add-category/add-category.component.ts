import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  category = {
    title: '',
    description: '',
  };

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open('Title Required', 'OK', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    } else {
      this.categoryService.addCategory(this.category).subscribe((data) => {
        this.snack.open('Category Added', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
        this.router.navigateByUrl('/admin/categories');
      });
    }
  }
}
