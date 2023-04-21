import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent implements ControlValueAccessor, AfterViewInit{
  @Input() public formControl!: FormControl;
  @Input() public name!: string;
  @Input() public data: any[] = [];
  @Input() public radioId!: string;
  @Input() public radioLabel!: string;
  @Output() public inputFocus: EventEmitter<any> = new EventEmitter();
  @Output() public inputChange: EventEmitter<any> = new EventEmitter();
  @Output() public inputBlur: EventEmitter<any> = new EventEmitter();
  editMode = false;

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


  public registerOnDisabledChange() {

  }

  public blurInput() {
    if(this.onTouched) {
      this.onTouched();
    }
    this.inputBlur.emit(this.value);
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

}
