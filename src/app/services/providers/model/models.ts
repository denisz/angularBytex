import humps from 'humps';

export class Work {
    key: string;
    title: string;
    firstPublishYear: string;
    subject: string[];
    authorName: string[];
    publisher: string[];
    authorKeys: string[];
    editionKeys: string[];
    editionCount: number;

    constructor(json: any) {
        Object.assign(this, humps.camelizeKeys(json));
    }

}

export class Excerpt  {
    excerpt: string;
    pages: number;
    author: {
        key: string;
    };
}

export class WorkDetail {
    description: string;
    title: string;
    key: string;
    firstPublishDate: string;
    excerpts: Excerpt[];
    subjects: string[];
    links: {
        url: string,
        title: string,
    };
    subjectPeople: string[];

    constructor(json: any) {
        Object.assign(this, humps.camelizeKeys(json));
    }
}

export class Edition {
    key: string;
    publishers: string[];
    title: string;
    subjects: string[];
    publishDate: string;

    constructor(json: any) {
        Object.assign(this, humps.camelizeKeys(json));
    }
}

export class AuthorDetail {
    name: string;
    key: string;
    birthDate: string;
    fullerName: string;

    constructor(json: any) {
        Object.assign(this, humps.camelizeKeys(json));
    }
}

export class Identifier {
    goodreads: string[];
    librarything: string[];
}

export class Book {
    key: string;
    title: string;
    subjects: string[];
    publishers: string[];
    publishDate: string;
    identifiers: Identifier[];
}

export class Publisher {
    name: string;
}

export class BookDetail {
    key: string;
    title: string;
    publishDate: string;
    publishers: Publisher[];
}

export class SearchResponse {
    docs: Work[];
    start: number;
    numFound: number;
}

export class EditionsResponse  {
    entries: Edition[];
    size: number;
}
