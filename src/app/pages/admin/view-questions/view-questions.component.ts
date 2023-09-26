import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {
  qid: any = null;
  title: any = null;
  questions: any = [];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.qid = params.get('qid');
      this.title = params.get('title');
      this.questionService.getQustionsOfQuiz(this.qid).subscribe((data) => {
        this.questions = data;
      });
    });
  }
  deleteQestion(quesId: any) {
    this.questionService.deleteQuestion(quesId).subscribe((data) => {
      this.questions = this.questions.filter(
        (question: any) => question.quesId != quesId
      );
      this.snack.open('Question Deleted', 'OK', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    });
  }
}
