import {NgModule} from '@angular/core';
import {ReadMoreComponent} from '../../../components/readmore/readmore.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import {
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule
} from '@angular/material';

@NgModule({
    declarations: [
        ReadMoreComponent,
    ],
    exports: [
        MatSelectModule,
        ReadMoreComponent,
        MatPaginatorModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        ClarityModule,
        MatChipsModule
    ]
})
export class LibraryCompModuleModule {
}
