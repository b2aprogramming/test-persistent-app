import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field.component';
import { FormsModule } from '@angular/forms';
import { PhoneNumberAutoPopulateDirective } from '../../directives/phone-number-auto-populate.directive';
import { DecimalDirective } from '../../directives/decimal.directive';
import { AllowedCharactersDirective } from '../../directives/allowed-characters.directive';


@NgModule({
  declarations: [
    FormFieldComponent,
    PhoneNumberAutoPopulateDirective,
    DecimalDirective,
    AllowedCharactersDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FormFieldComponent,
    PhoneNumberAutoPopulateDirective,
    DecimalDirective,
    AllowedCharactersDirective
  ]
})
export class FormFieldModule { }
