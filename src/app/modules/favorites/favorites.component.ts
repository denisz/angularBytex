import {Component, OnInit} from '@angular/core';
import {DataService, Entry} from '../../services/data.service';
import {BehaviorSubject} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
    public initloading = false;
    public loading = false;

    public entries$ = new BehaviorSubject<Entry[]>([]);
    public tags$ = new BehaviorSubject<Set<string>>(new Set([]));
    public selectedTags = new FormControl();

    constructor(private dataGateway: DataService) {
    }

    onSelectedTagsChange() {
        this.filter().then(() => {});
    }

    async ngOnInit() {
        this.initloading = true;
        try {
            const tags = await this.dataGateway.getAllTags();
            this.tags$.next(tags);
            this.selectedTags.setValue([...tags]);
        } catch (e) {
            console.error(e);
        }

        this.initloading = false;
    }

    async filter() {
        this.loading = true;
        try {
            const tags = this.selectedTags.value;
            const entries = await this.dataGateway.getEntryByTags(tags);
            this.entries$.next(entries);
        } catch (e) {
            console.error(e);
        }

        this.loading = false;
    }
}
