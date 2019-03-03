import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getText'
})
export class GetTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === 'object') {
        return value.value;
    }
    return value;
  }

}
