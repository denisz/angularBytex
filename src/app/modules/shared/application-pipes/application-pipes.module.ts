import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OlcoverurlPipe} from '../../../pipes/olcoverurl.pipe';
import {GetolidPipe} from '../../../pipes/getolid.pipe';
import {GetTextPipe} from '../../../pipes/get-text.pipe';

@NgModule({
    declarations: [
        GetolidPipe,
        OlcoverurlPipe,
        GetTextPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        GetolidPipe,
        OlcoverurlPipe,
        GetTextPipe
    ]
})
export class ApplicationPipesModule {
}
