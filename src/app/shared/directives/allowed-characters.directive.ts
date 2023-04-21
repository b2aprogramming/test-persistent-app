import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appAllowedCharacters]'
})
export class AllowedCharactersDirective {
  @Input('appAllowedCharacters') public allowedCharacters: any;
  @Input() public notAllowedCharacters: any;
  @Output() public keyChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() public keyUp: EventEmitter<any> = new EventEmitter();
  private keys = [46, 8, 9, 27, 13, 37, 38, 39, 40];

  @HostListener('keydown', ['$event'])
  public onKeyDown(e: any): undefined | boolean {
    let keyCode = e['keyCode']  ? e['keyCode'] : e['which'];
    this.keyChangeEvent.emit({keyCode: keyCode});
    if(this.keys.indexOf(keyCode) === -1 && this.allowedCharacters && e.key.search(this.allowedCharacters) === -1) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter
      this.keys.indexOf(keyCode) !== -1 ||
      (this.allowedCharacters && e.key.match(this.allowedCharacters)) ||
      (keyCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
      (keyCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
      (keyCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
      (keyCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
      (keyCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
      (keyCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
      (keyCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
      (keyCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
      (keyCode >= 35 && keyCode <= 36) // Home, End, Left, Right
    ) {
      return;
    }
    if(!(keyCode >=37 && keyCode <=40)) {
      if (
        (e.shiftKey || (keyCode < 48 || keyCode > 57)) &&
        (keyCode < 96 || keyCode > 105 )
      ) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return;
      }
    }

  }

  @HostListener('paste', ['$event'])
  public onPaste(event: any): void {
    event.preventDefault();
    const pastedInput: string = event.clipboardData.getData('text/plain');
    let txt = pastedInput.replace(this.notAllowedCharacters, ''); // get a digit-only string;
    document.execCommand('insertText', false, txt);
  }
  @HostListener('keyup', ['$event'])
  public onKeyUp(e: any): void {
    let keyCode = e['keyCode']  ? e['keyCode'] : e['which'];
    const val = e.target['value'] || '';
    setTimeout(() => {
      this.keyUp.emit({keyCode: keyCode, value: val.replace(this.notAllowedCharacters, '')});
    }, 150);
  }
}
