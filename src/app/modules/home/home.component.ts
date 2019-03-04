import {Component} from '@angular/core';
import {HomeDataSource} from './home.dataSource';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    public titleControl = new FormControl('');
    public subjectsControl = new FormControl('');

    constructor(public dataSource: HomeDataSource) {
    }

    onPageChanged(evt) {
        const {pageSize: limit, pageIndex: page} = evt;
        this.dataSource.filterChanges$.next({limit, page: page + 1});
    }

    submitFormIfNeeded(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            this.submitForm();
        }
    }

    submitForm() {
        const title = this.titleControl.value;
        const subjects = this.subjectsControl.value;
        this.dataSource.filterChanges$.next({title, subjects});
    }
}
