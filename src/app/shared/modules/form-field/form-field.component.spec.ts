import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {

  let spectator: Spectator<FormFieldComponent>;
  const createComponent = createComponentFactory({
    component: FormFieldComponent,
    imports: [
      IonicModule, 
      CommonModule,
      FormsModule
    ],
    declarations: [
      FormFieldComponent,
    ],
    providers: [
    ],
    mocks: [],
    detectChanges: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
  it('should call value', () => {
    spectator.component.value = 'Hotel';
    expect(spectator.component['_value']).toBe('Hotel');
  });
  it('should call onTextAreaFocus', () => {
    spectator.component.onTextAreaFocus();
    expect(spectator.component.textareaFocusBlurText).toBe('focus');
  });
  it('should call onTextAreaBlur', () => {
    spectator.component.onTextAreaBlur();
    expect(spectator.component.textareaFocusBlurText).toBe('blur');
  });
  it('should call openDatePicker', () => {
    spectator.component.type = 'datePicker';
    spectator.fixture.detectChanges();
    const childComponent = jasmine.createSpyObj('IonDatetime', ['open']);
    spectator.component.datePicker =  childComponent;
    spectator.click('.date-time-label');
    expect(spectator.component.datePicker.open).toHaveBeenCalled();
  });
  it('should call selectCompareWith', () => {
    spectator.component.selectDataId = 'id';
    spectator.fixture.detectChanges();
    expect(spectator.component.selectCompareWith({id: 1, name: 'text 1'}, {id: 1, name: 'text 1'})).toBeTruthy();
  });
});
