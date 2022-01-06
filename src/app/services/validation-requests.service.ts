import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface UniqueEmail {
  uniqueEmail: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidationRequestsService {

  constructor(private http: HttpClient) { }

  public checkIsUniqueEmail(email: string): Observable<boolean> {
    // return this.http.post('someRoute', email)

    if (email === 'test@test.test') {
      return of(true).pipe(delay(2000))
    }
    return of(false).pipe(delay(2000))
  }

}
