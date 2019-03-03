import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesComponent} from './favorites.component';
import {FavoritesRoutingModule} from './favorites-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import {LibraryCompModuleModule} from '../shared/library-comp-module/library-comp-module.module';
import {ApplicationPipesModule} from '../shared/application-pipes/application-pipes.module';

@NgModule({
    declarations: [
        FavoritesComponent
    ],
    imports: [
        CommonModule,
        ApplicationPipesModule,
        LibraryCompModuleModule,
        TranslateModule.forChild(),
        FavoritesRoutingModule
    ]
})
export class FavoritesModule {
}
