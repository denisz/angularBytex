import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailComponent} from './book-detail.component';
import {BookDetailRoutingModule} from './book-detail-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TagInputModule} from 'ngx-chips';
import {ApplicationPipesModule} from '../shared/application-pipes/application-pipes.module';
import {LibraryCompModuleModule} from '../shared/library-comp-module/library-comp-module.module';

@NgModule({
    declarations: [
        BookDetailComponent,
    ],
    imports: [
        LibraryCompModuleModule,
        ApplicationPipesModule,
        CommonModule,
        TagInputModule,
        TranslateModule.forChild(),
        BookDetailRoutingModule,
    ],
    bootstrap: [BookDetailComponent]
})
export class BookDetailModule {
}
