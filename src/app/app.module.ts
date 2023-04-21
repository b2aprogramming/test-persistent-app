import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SuccessComponent } from './pages/success/success.component';
import { FormFieldModule } from './shared/modules/form-field/form-field.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioGroupModule } from './shared/modules/radio-group/radio-group.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormFieldModule,
    ReactiveFormsModule,
    RadioGroupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
