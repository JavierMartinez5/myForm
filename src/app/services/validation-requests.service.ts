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

  public checkIsUniqueEmail(email: string): Observable<UniqueEmail | null> {
    // return this.http.post('someRoute', email)

    if (email === 'test@test.test') {
      return of({uniqueEmail: true}).pipe(delay(2000))
    }
    return of(null).pipe(delay(2000))
  }

}
