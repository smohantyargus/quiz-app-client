import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  qid: any = null;
  quiz: any = null;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.qid = params.get('qid');
      this.quizService.getQuiz(this.qid).subscribe((data) => {
        this.quiz = data;
      });
    });
  }

  startQuiz() {
    this.router.navigateByUrl(`/quiz/start/${this.quiz.qid}`);
  }
}
