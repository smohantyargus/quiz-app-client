import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    noOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };

  categories: any = [];
  constructor(
    private categoryService: CategoryService,
    private quizService: QuizService,
    private snack: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  formSubmit() {
    this.quizService.addQuiz(this.quiz).subscribe((data) => {
      this.snack.open('Quiz Created', 'OK', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    });
  }
}
