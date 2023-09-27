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

  timer: any = undefined;

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
          this.timer = this.questions.length * 1 * 60;
          this.questions.forEach((q: any) => {
            q['givenAnswer'] = '';
          });
          this.startTimer();
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
      this.evalQuiz();
    }
  }

  evalQuiz() {
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

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }
}
