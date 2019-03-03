import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { CustomHttpUrlEncodingCodec } from '../encoder';
import { Configuration } from '../configuration';
import { PaginationParameters } from '../pagination';
import { BASE_PATH } from '../../variables';
import {FilterParameters} from '../filter';
import {AuthorDetail, Book, BookDetail, EditionsResponse, SearchResponse, WorkDetail} from '../model/models';
import {retry} from 'rxjs/operators';

@Injectable()
export class ApiService {
    protected basePath = 'https://openlibrary.org';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient,
                @Optional()@Inject(BASE_PATH) basePath: string,
                @Optional() configuration: Configuration) {

        if (basePath) {
            this.basePath = basePath;
        }

        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    // Поиск работ по ключевому слову
    searchWorksJsonGet(filter: FilterParameters, pagination?: PaginationParameters): Observable<SearchResponse> {
        if (filter === null || filter === undefined) {
            throw new Error('Required parameter filter was null or undefined when calling searchWorksJsonGet.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        if (filter.subjects !== undefined && filter.subjects !== null && filter.subjects !== '') {
            queryParameters = queryParameters.set('subjects', filter.subjects);
        }

        if (filter.title !== undefined && filter.title !== null && filter.title !== '') {
            queryParameters = queryParameters.set('title', filter.title);
        }


        queryParameters = queryParameters.set('page', String(pagination.page));
        // queryParameters = queryParameters.set('offset', String(pagination.offset));
        queryParameters = queryParameters.set('limit', String(pagination.limit));

        let headers = this.defaultHeaders;
        headers = headers.set('Accept', 'application/json');

        // TOOD: Добавить retryWhen
        return this.httpClient.get<any>(`${this.basePath}/search.json`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers,
                observe: 'body',
                reportProgress: false
            }
        ).pipe( retry(3) );
    }

    editionsByWorkIdJsonGet(OLID: string): Observable<EditionsResponse> {
        let headers = this.defaultHeaders;
        headers = headers.set('Accept', 'application/json');

        return this.httpClient.get<any>(`${this.basePath}/works/${OLID}/editions.json`,
            {
                withCredentials: this.configuration.withCredentials,
                headers,
                observe: 'body',
                reportProgress: false
            }
        );
    }

    workByIdJsonGet(OLID: string): Observable<WorkDetail> {
        let headers = this.defaultHeaders;
        headers = headers.set('Accept', 'application/json');

        return this.httpClient.get<any>(`${this.basePath}/works/${OLID}.json`,
            {
                withCredentials: this.configuration.withCredentials,
                headers,
                observe: 'body',
                reportProgress: false
            }
        );
    }

    authorDetail(OLID: string): Observable<AuthorDetail> {
        let headers = this.defaultHeaders;
        headers = headers.set('Accept', 'application/json');

        return this.httpClient.get<any>(`${this.basePath}/authors/${OLID}.json`,
            {
                withCredentials: this.configuration.withCredentials,
                headers,
                observe: 'body',
                reportProgress: false
            }
        );
    }

    bookByIdJsonGet(OLID: string): Observable<Book> {
        let headers = this.defaultHeaders;
        headers = headers.set('Accept', 'application/json');

        return this.httpClient.get<any>(`${this.basePath}/books/${OLID}.json`,
            {
                withCredentials: this.configuration.withCredentials,
                headers,
                observe: 'body',
                reportProgress: false
            }
        );
    }

    bookDetailByIdJsonGet(OLID: string): Observable<BookDetail> {
        let headers = this.defaultHeaders;
        headers = headers.set('Accept', 'application/json');

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        queryParameters = queryParameters.set('jscmd', 'data');
        queryParameters = queryParameters.set('format', 'json');
        queryParameters = queryParameters.set('bibkeys', `OLID:${OLID}`);

        return this.httpClient.get<any>(`${this.basePath}/api/books`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers,
                observe: 'body',
                reportProgress: false
            }
        );
    }
}
