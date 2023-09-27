import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private http: HttpClient) {}

  public addResult(result: any) {
    this.http.post(`${baseUrl}/result/`, result);
  }

  public getResultByQuizAndUser(qid: any, uid: any) {
    this.http.get(`${baseUrl}/result/${qid}/${uid}`);
  }

  public getResultByQuiz(qid: any) {
    this.http.get(`${baseUrl}/result/${qid}`);
  }
}
