import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClarityModule} from '@clr/angular';
import {NgForageModule} from 'ngforage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ApiModule} from './services/providers/api.module';
import {Configuration, ConfigurationParameters} from './services/providers/configuration';
import {environment} from '../environments/environment';
import {BASE_PATH, COVER_BASE_PATH} from './services/variables';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ApplicationPipesModule} from './modules/shared/application-pipes/application-pipes.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

// Configuration api service
export function apiConfigFactory(): Configuration {
    const params: ConfigurationParameters = {};
    return new Configuration(params);
}

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        ApplicationPipesModule,
        BrowserModule,
        AppRoutingModule,
        ClarityModule,
        HttpClientModule,
        ApiModule.forRoot(apiConfigFactory),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgForageModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [
        {provide: BASE_PATH, useValue: environment.API_BASE_PATH},
        {provide: COVER_BASE_PATH, useValue: environment.COVER_BASE_PATH}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
