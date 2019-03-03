import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PaginationParameters} from '../../services/providers/pagination';
import {FilterParameters} from '../../services/providers/filter';
import {SearchResponse, Work} from '../../services/providers/model/models';
import {ApiService} from '../../services/providers/api/api.service';
import {map, tap} from 'rxjs/operators';


export class DatagridState implements PaginationParameters, FilterParameters {
    title: string;
    subjects: string;
    limit: number;
    page: number;
}

export interface DataSourceInterface {
    connect(): {
        items: Observable<Work[]>,
        total: Observable<number>,
    };
}

@Injectable({
    providedIn: 'root'
})
export class HomeDataSource implements DataSourceInterface {
    public readonly loading$ = new BehaviorSubject<boolean>(false);
    public readonly total$: Observable<number>;
    public readonly works$: Observable<Work[]>;
    public readonly errors$ = new BehaviorSubject<Error>(null);
    private response$ = new BehaviorSubject<SearchResponse>({docs: [], numFound: 0, start: 0});

    public filterChanges$ = new BehaviorSubject<any>({
        title: 'The Hobbit',
        subjects: '',
        limit: 10,
        page: 1,
    });

    public currentFilter: DatagridState;

    constructor(private apiGateway: ApiService) {
        this.works$ = this.response$.pipe(
            map(val => val.docs.map(v => new Work(v))),
            tap(console.log)
        );

        this.total$ = this.response$.pipe(
            map(val => Number(val.numFound))
        );

        this.filterChanges$
            .subscribe(async (newState) => {
                this.currentFilter = {...this.currentFilter, ...newState};
                await this.beginBatchFetchWithFilterAndPagination(this.currentFilter, this.currentFilter);
            });
    }

    connect(): {
        items: Observable<Work[]>,
        total: Observable<number>,
    } {
        return {
            items: this.works$,
            total: this.total$,
        };
    }

    async beginBatchFetchWithFilterAndPagination(filter: FilterParameters, pagination: PaginationParameters) {
        this.loading$.next(true);

        try {
            const resp: SearchResponse = await this.apiGateway.searchWorksJsonGet(filter, pagination).toPromise();
            this.response$.next(resp);
        } catch (e) {
            this.errors$.next(e);
        }

        this.loading$.next(false);
    }
}
