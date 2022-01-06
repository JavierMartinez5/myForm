import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ValidationRequestsService } from "../services/validation-requests.service";

export interface UniqueEmail {
  uniqueEmail: boolean
}

@Injectable({
  providedIn: 'root'
})
export class MyValidatorsService {

  constructor(private validationRequestsService: ValidationRequestsService) {
    this.uniqueEmail = this.uniqueEmail.bind(this)
  }

  public uniqueEmail(control: AbstractControl): Observable<UniqueEmail | null> {
    return this.validationRequestsService.checkIsUniqueEmail(control.value).pipe(map((res) => {
      return res ? {uniqueEmail: true} : null
    }))
  }
}