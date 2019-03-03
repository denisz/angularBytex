import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ClarityModule} from '@clr/angular';
import {ApplicationPipesModule} from '../shared/application-pipes/application-pipes.module';
import {LibraryCompModuleModule} from '../shared/library-comp-module/library-comp-module.module';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        LibraryCompModuleModule,
        ApplicationPipesModule,
        CommonModule,
        TranslateModule.forChild(),
        HomeRoutingModule,
        ClarityModule
    ],
    bootstrap: [HomeComponent]
})
export class HomeModule {
}
