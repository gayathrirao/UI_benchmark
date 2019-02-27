import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calenderText'
})
export class CalenderTextPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const dot = '...';
    return (value && value.length>20) ? value.slice(0,20) + dot : value;
  }

}
