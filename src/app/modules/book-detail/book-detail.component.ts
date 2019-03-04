import {Component} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Edition, WorkDetail} from '../../services/providers/model/models';
import {ApiService} from '../../services/providers/api/api.service';
import {ActivatedRoute} from '@angular/router';
import {MatChipInputEvent} from '@angular/material';
import {ChannelsEntry, DataService} from '../../services/data.service';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
    public error: string;
    public loading = true;
    public work: WorkDetail;
    public editions: Edition[];

    public localEntry: ChannelsEntry;

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
        private apiGateway: ApiService,
        private dataGateway: DataService,
        private activatedRoute: ActivatedRoute
    ) {
        activatedRoute.queryParams.subscribe(async (params) => {
            this.loading = true;
            try {
                const olid = params.id;

                const jsonWork = await this.apiGateway.workByIdJsonGet(olid).toPromise();
                this.work = new WorkDetail(jsonWork);

                const jsonEditions = await this.apiGateway.editionsByWorkIdJsonGet(olid).toPromise();
                this.editions = jsonEditions.entries.map(v => new Edition(v));

                const {title, subjects, key, firstPublishDate} = this.work;
                const localEntry = await this.dataGateway.selectOrCreateEntry(
                    {title, subjects, key, firstPublishDate, tags: []},
                    key
                );

                this.localEntry = await this.dataGateway.getChannelsForEntry(localEntry);
            } catch (err) {
                console.error(err);
                this.error = err;
            }
            this.loading = false;
        });
    }

    async add(event: MatChipInputEvent): Promise<boolean> {
        const input = event.input;
        const value = event.value;

        try {
            await this.localEntry.addTag(value);
            // Reset the input value
            if (input) {
                input.value = '';
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    async remove(value: string): Promise<boolean> {
        try {
            await this.localEntry.removeTag(value);
            return true;
        } catch (e) {
            return false;
        }

    }
}
