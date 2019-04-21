import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms'

@Directive({
  selector: '[appAppSelectValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: AppSelectValidatorDirective,
    multi: true
  }]
})
export class AppSelectValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return control.value === '-1' ? { 'defaultSelected': true } : null;
  }

}
