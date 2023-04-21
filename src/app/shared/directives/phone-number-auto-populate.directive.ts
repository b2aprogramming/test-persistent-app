import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appPhoneNumberAutoPopulate]'
})
export class PhoneNumberAutoPopulateDirective {
  @Output() changeValue: EventEmitter<string> = new EventEmitter();
  @HostListener('keydown', ['$event'])
  public handleKeyDown(event: KeyboardEvent) {
    this.enforceFormat(event)
  }
  @HostListener('keyup', ['$event'])
  public handleKeyUp(event: KeyboardEvent) {
    this.formatToPhone(event);
  }

  constructor() { }

  private enforceFormat(event: KeyboardEvent){
    const key = event.keyCode || event.which;
    if(key !== 8 && (!this.isNumericInput(event) && !this.isModifierKey(event))){
      event.preventDefault();
    }
  }

  private isNumericInput(event: any) {
    const key = event.keyCode;
    return ((key >= 48 && key <= 57) || // Allow number line
      (key >= 96 && key <= 105) // Allow number pad
    );
  };

  private isModifierKey(event: any){
    const key = event.keyCode;
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
      ( key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
      (key > 36 && key < 41) || // Allow left, up, right, down
      (
        // Allow Ctrl/Command + A,C,V,X,Z
        (event.ctrlKey === true || event.metaKey === true) &&
        (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
      )
  }

  private formatToPhone(event: any){
    let isVal = this.isModifierKey(event);
    if(isVal) {return;}

    // I am lazy and don't like to type things more than once
    const target = event.target;
    const input = event.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
    const zip = input.substring(0,3);
    const middle = input.substring(3,6);
    const last = input.substring(6,10);

    if(input.length > 6){
      target.value = `(${zip}) ${middle}-${last}`;
    } else if(input.length > 3){
      target.value = `(${zip}) ${middle}`;
    } else if(input.length > 0){
      target.value = `(${zip}`;
    }
    this.changeValue.emit(target.value)
  }

}
