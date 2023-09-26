import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  qid: any = null;
  quiz: any = null;
  categories: any = [];
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.qid = params.get('qid');
      this.quizService.getQuiz(this.qid).subscribe((data) => {
        this.quiz = data;
      });
      this.categoryService.getCategories().subscribe((categories) => {
        this.categories = categories;
      });
    });
  }

  formSubmit() {
    this.quizService.updateQuiz(this.quiz).subscribe((data) => {
      this.snack.open('Quiz Updated', 'OK', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
      this.router.navigateByUrl('/admin/quizzes');
    });
  }
}
