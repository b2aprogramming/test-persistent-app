import { Component, OnInit } from '@angular/core';
import jsonData from '../../../assets/jsonData/data.json';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EmitterService } from 'src/app/shared/services/emitter.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public questionForm!: FormGroup;
  public questionData =  jsonData;
  constructor(
    private formBuilder: FormBuilder,
    private emitterService: EmitterService,
    private router: Router
    ) {}
  ngOnInit(): void {
    this.buildForm();
    console.log(this.questionForm);
    console.log(this.questionForm.value);
  }

  public buildForm() {
    this.questionForm = this.formBuilder.group({
      questions: this.formBuilder.array([])
    });
    this.buildFormArray();
  }

  public submitQuestionAnswers() {
    if(this.questionForm.valid) {
      this.emitterService.setFormValues(this.questionForm.getRawValue());
      this.router.navigate(['/success']);
    }
  }

  private checkBoxVlidator(): any {
    return (formArray:FormArray): any => {
      let valid:boolean = false;
      formArray.controls.forEach((x)=>{
        const ele = x as FormGroup;
        if(ele.value.answer) {
          valid = ele.value.answer;
        }
      })
      return valid ? null: {checkBox: true}
    }
  };

  private customPatternVlidation(pattern: RegExp): any {
    return (formControl:FormControl): any => {
      const val = formControl.value;
      if(!val) {
        return null;
      }
      let isValid = val.search(pattern) > -1;
      return isValid ? null: {customPattern: true}
    }
  };

  private buildFormArray() {
    const formArr = this.questionForm.get('questions') as FormArray;
    jsonData.forEach((ele) => {
      const formControlObject: any = {
        ...ele,
        answer: ele.type !== 'checkbox' ? null : this.formBuilder.array([], {validators: [this.checkBoxVlidator()]})
      }
     const formGroup: any = this.formBuilder.group(formControlObject);

      if(ele.type == 'checkbox') {
        ele.choices?.forEach((checkbox) => {
          const chBox = formGroup.get('answer') as FormArray;
          chBox.push(this.formBuilder.group({
            ...checkbox,
            answer: false
          }));
        });
      }else {
        const validators = [];
        if(ele.required) {
          validators.push(Validators.required)
        }
        if(ele.pattern) {
          validators.push(this.customPatternVlidation(new RegExp(ele.pattern, 'mig')));
        }
        if(validators.length) {
          formGroup.get('answer').setValidators(validators);
        }
      }

      formArr.push(formGroup);
    })
  }
}
