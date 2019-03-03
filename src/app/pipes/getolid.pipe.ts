import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'getolid'
})
export class GetolidPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        const result = value.match(/OL(\d+)(W|M|A)$/i);

        if (result) {
            return result[0];
        }
        return null;
    }

}
