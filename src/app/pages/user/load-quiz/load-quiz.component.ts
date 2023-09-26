import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  cid: any = 0;
  quizzes: any = [];

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.cid = params.get('cid');

      if (this.cid == 0) {
        this.quizService.getActiveQuizzes().subscribe((data) => {
          this.quizzes = data;
        });
      } else {
        this.quizService
          .getActiveQuizzesByCategory(this.cid)
          .subscribe((data) => {
            this.quizzes = data;
          });
      }
    });
  }
}
