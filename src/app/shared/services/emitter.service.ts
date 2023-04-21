import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  private questionFormValues:BehaviorSubject<any> = new BehaviorSubject(null);
  private questionFormValues$ = this.questionFormValues.asObservable();
  constructor() { }

  public getFormValues(): Observable<any> {
    return this.questionFormValues$;
  }
  public setFormValues(value: any) {
    return this.questionFormValues.next(value);
  }
}
