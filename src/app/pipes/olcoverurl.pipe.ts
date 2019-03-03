import {Inject, Optional, Pipe, PipeTransform} from '@angular/core';
import {COVER_BASE_PATH} from '../services/variables';

export const CoverSizes = new Set(['S', 'M', 'L']);

@Pipe({
    name: 'olcoverurl',
})
export class OlcoverurlPipe implements PipeTransform {
    protected basePath = 'http://covers.openlibrary.org';

    constructor(@Optional() @Inject(COVER_BASE_PATH) basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    transform(value: any, size: string = 'M'): any {
        if (value === null) {
            return null;
        }

        if (!CoverSizes.has(size)) {
            size = 'M';
        }

        const result = value.match(/.*(W|M)$/i);

        if (result) {
            const httpType: string = {
                W: 'w',
                M: 'b',
            }[result[1]];
            return `${this.basePath}/${httpType}/olid/${value}-${size}.jpg`;
        }
        return null;
    }
}
