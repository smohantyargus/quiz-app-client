import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css'],
})
export class QuizStartComponent implements OnInit {
  qid: any = null;
  questions: any = [];
  marksGot: any = 0;
  correctAnswers: any = 0;
  attempted: any = 0;
  isSubmit: boolean = false;

  constructor(
    private locationStrategy: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.qid = params.get('qid');
      this.questionService
        .getQustionsOfQuizForTest(this.qid)
        .subscribe((data) => {
          this.questions = data;
          this.questions.forEach((q: any) => {
            q['givenAnswer'] = '';
          });
          console.log(data);
        });
    });
  }

  preventBackButton() {
    history.pushState(null, 'null', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, 'null', location.href);
    });
  }

  submitQuiz() {
    let conf = confirm('Want to submit?');
    if (conf) {
      this.isSubmit = true;
      this.questions.forEach((q: any) => {
        if (q.givenAnswer == q.answer) {
          this.correctAnswers++;
          this.marksGot =
            this.marksGot +
            this.questions[0].quiz.maxMarks / this.questions.length;
        }
        if (q.givenAnswer.trim() != '') {
          this.attempted++;
        }
      });
    }
  }
}