import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

export const kLangStorage = 'lang';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(private translate: TranslateService ) {
        translate.addLangs(['en', 'ru']);
        translate.setDefaultLang('en');

        const initLang = window.localStorage.getItem(kLangStorage);
        if (initLang) {
            this.translate.use(initLang);
        } else {
            const browserLang = translate.getBrowserLang();
            translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
        }
    }

    changeLanguage(language: string) {
        this.translate.use(language);
        window.localStorage.setItem(kLangStorage, language);
    }
}
