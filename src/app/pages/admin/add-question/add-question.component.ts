import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  qid: any = null;
  title: any = null;

  question: any = {
    content: '',
    image: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      qid: null,
    },
  };

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.qid = params.get('qid');
      this.title = params.get('title');
      this.question.quiz.qid = this.qid;
    });
  }

  formSubmit() {
    this.questionService.addQuestion(this.question).subscribe((data) => {
      this.question = {
        ...this.question,
        content: '',
        image: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
      };
      this.snack.open('Question Created', 'OK', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    });
  }
}
