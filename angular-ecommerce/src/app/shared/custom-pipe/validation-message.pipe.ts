import { Pipe, PipeTransform } from '@angular/core';
import { ValidationMessage } from '../../core/constants/constants';

@Pipe({
  name: 'validationMessage',
  standalone: true
})
export class ValidationMessagePipe implements PipeTransform {

  transform(keyName: string): string {
      return ValidationMessage[keyName] || 'Invalid Key';
  }

}
