import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  public sendQuery(data) {
    return this.http
    .post('/api/api/mailCampaigns/dummyApi', data)
    .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if(error.status === 504) {
      return throwError('No internet connection, Please try again.' || '');
    } 
    return throwError(error.error.message || '');
  }
}
