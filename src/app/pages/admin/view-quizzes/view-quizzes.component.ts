import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  constructor(private quizService: QuizService, private snack: MatSnackBar) {}
  quizzes: any = [];
  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }
  deleteQuiz(qid: any) {
    this.quizService.deleteQuiz(qid).subscribe((data) => {
      this.quizzes = this.quizzes.filter((quiz: any) => quiz.qid != qid);
      this.snack.open('Quiz Deleted', 'OK', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    });
  }
}
