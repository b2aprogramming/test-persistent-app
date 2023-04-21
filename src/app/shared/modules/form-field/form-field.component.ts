import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, ViewChild, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RegExData } from '../../constants/regx.constants';
import { FormInputFields } from './models/form.models';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormFieldComponent),
    multi: true
  }]
})
export class FormFieldComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('formField') formField: any;
  @Input() public type: FormInputFields = 'text';
  @Input() public formControl!: FormControl;
  @Input() public name!: string;
  @Input() public readonly: boolean = false;
  @Input() public disabled: boolean = false;
  @Input() public datePickerFormat: string = 'MM/DD/YYYY';
  @Input() public placeholder: string = 'Select';
  @Input() public selectData: any[] = [];
  @Input() public idKey: string = '';
  @Input() public labelKey: string = '';
  @Input() public selectInterface: 'alert' | 'popover' | 'action-sheet' = 'alert';
  @Input() public isLabel: boolean = true;
  @Input() public inputClass: string = '';
  @Input() public labelName: string = '';
  @Input() public cssClass!: string;
  @Input() public maxLength: number | null = null;
  @Input() public textAreaRows:number = 4;
  @Input() public textAreaCols:number = 10;
  @Input() public maxDateYear: number = new Date().getFullYear() + 1;
  @Output() public inputFocus: EventEmitter<any> = new EventEmitter();
  @Output() public inputChange: EventEmitter<any> = new EventEmitter();
  @Output() public inputBlur: EventEmitter<any> = new EventEmitter();
  editMode = false;
  public defaultDateValue = new Date();
  public textareaFocusBlurText = 'blur';
  public customPopoverOptions = {
    header: 'Select',
  };
  public numberPat = RegExData.NumbersOnly;
  public notNumberPat = RegExData.NotNumbersOnly;

  public decimalPat = RegExData.NumbersWithDecimalOnly;
  public notDecimalPat = RegExData.NotNumberWithDecimalsOnly;

  public phoneFormat = RegExData.PhoneFormat;
  public noPhoneFormat = RegExData.NoPhoneFormat;

  public compareWith = this.selectCompareWith.bind(this);

  private onChange!: (val: any) => {};

  private onTouched!: () => {};

  private _value= null;
  constructor(private eleRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) { }

  get value(): any{
    return this._value;
  }
  @Input() set value( val ){
    this._value = val;
    if(this.onChange){
      this.onChange(val);
    }
  }
  public ngAfterViewInit(): void {
    setTimeout(() => {

    }, 300);
  }


  public edit(): void {
    this.editMode = true;
  }

  public writeValue(val: any): void {
    this.value = val;
  }

  public registerOnChange(fn: ()=> {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public onTextAreaFocus():void {
    this.textareaFocusBlurText = 'focus';
    this.focusInput();
  }

  public registerOnDisabledChange() {

  }
  public onTextAreaBlur():void {
    this.textareaFocusBlurText = 'blur';
    this.blurInput();
  }

  public openDatePicker(evt: Event):void {
    if(evt) {
      evt.stopPropagation();
      if(this.type === 'datePicker') {
      }
    }

  }

  public openSelect(): void {

  }

  public selectCompareWith(o1: any, o2: any): boolean {
    if(typeof o1 === 'object' && typeof o2 === 'object') {
      return o1 && o2 ? o1[this.idKey] === o2[this.idKey] : o1 === o2;
    }else {
      return o1 && o2 ? o1 === o2 : o1 === o2;
    }
  }

  public blurInput() {
    if(this.onTouched) {
      this.onTouched();
    }
    this.inputBlur.emit(this.value);
  }

  public changePhoneNumber(value: any) {
    this.value = value;
    this.changeDetectorRef.detectChanges();
  }

  public changeNumberValue(evt: any) {
    this.value = evt.value
  }

  public focusInput(): void {
    this.inputFocus.emit(this.value);
    this.changeDetectorRef.detectChanges();
  }

  public textAreaFocus() {
    this.inputFocus.emit(this.value);
    this.changeDetectorRef.detectChanges();
  }

  public changeInput(): void {
    this.inputChange.emit(this.value);
    this.changeDetectorRef.detectChanges();
  }

  public dTextareaChange(evt: any) {
    console.log('hi', evt);
  }
}
