import {NgModule} from '@angular/core';
import {ReadMoreComponent} from '../../../components/readmore/readmore.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import {
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatChipsModule,
    MatListModule,
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
