import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidatorsService } from '../validators/myValidators.service';

export interface IFrameworkVersions {
  angular: string[]
  react: string[]
  vue: string[]
}

export type frameworks = 'angular' | 'react' | 'vue'

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  public form!: FormGroup
  public frameworks: frameworks[] = ['angular', 'react', 'vue']
  public frameworkVersions: any = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3']
  }

  constructor(private myValidatorsService: MyValidatorsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      framework: new FormControl('', [Validators.required]),
      frameworkVersion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required], [this.myValidatorsService.uniqueEmail]),
      hobbies: new FormArray([
        new FormGroup({
          name: new FormControl('', [Validators.required]),
          duration: new FormControl('', [Validators.required])
        })
      ], [Validators.required])
    })
  }

  get formHobbies(): FormArray {
    return this.form.get('hobbies') as FormArray;
  }

  public addHobbyGroup() {
    const hobbyGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required])
    });
    // (<FormArray>this.form.get('hobbies')).push(hobbyGroup);
    const field = this.form.get('hobbies') as FormArray
    field.push(hobbyGroup)
  }

  public submit() {
    if (this.form.valid) {
      const formValueForConsole = JSON.parse(JSON.stringify(this.form.value))
      console.log('formValue : ', formValueForConsole);
    } else {
      return
    }
    this.form.reset();
  }

  public get fVersions() {
    const selectedFramework = this.form.get('framework')?.value as frameworks
    return this.frameworkVersions[selectedFramework]
  }
}
