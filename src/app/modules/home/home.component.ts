import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {HomeDataSource} from './home.dataSource';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
    public titleControl = new FormControl('');
    public subjectsControl = new FormControl('');

    @ViewChild('paginator') paginator: MatPaginator;

    constructor(public dataSource: HomeDataSource) {
    }

    ngAfterViewInit(): void {
        this.paginator.page.subscribe((evt) => {
            const {pageSize: limit, pageIndex: page} = evt;
            this.dataSource.filterChanges$.next({limit, page: page + 1});
        });
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
