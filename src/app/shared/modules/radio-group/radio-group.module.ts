import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioGroupComponent } from './radio-group.component';



@NgModule({
  declarations: [
    RadioGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RadioGroupComponent
  ]
})
export class RadioGroupModule { }
