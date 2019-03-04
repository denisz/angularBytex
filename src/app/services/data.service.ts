import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NgForage, NgForageOptions, Driver} from 'ngforage';

export interface ChannelsEntry {
    tags$: BehaviorSubject<string[]>;
    addTag: (tag: string) => Promise<Entry>;
    removeTag: (tag: string) => Promise<Entry>;
}

export interface Entry {
    key: string;
    title: string;
    tags: string[];
    subjects: string[];
    firstPublishDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(public readonly ngf: NgForage) {

        const opts: NgForageOptions = {
            driver: Driver.LOCAL_STORAGE,
            size: 4980736,
            version: 1,
            name: 'openBook',
            storeName: 'op'
        };
        this.ngf.configure(opts);
    }

    async getChannelsForEntry(entry: Entry): Promise<ChannelsEntry> {
        const tags$ = new BehaviorSubject<string[]>(entry.tags);
        const setTags = new Set<string>(entry.tags);

        const saveTag = async (): Promise<Entry> => {
            entry.tags = Array.from(setTags);
            try {
                await this.ngf.setItem(entry.key, entry);
                tags$.next(entry.tags);
            } catch (e) {

            }
            return entry;
        };

        return {
            tags$,
            addTag: (val) => {
                if ((val || '').trim()) {
                    setTags.add(val.trim());
                }

                return saveTag();
            },
            removeTag: (val) => {
                setTags.delete(val);
                return saveTag();
            }
        };
    }

    async selectOrCreateEntry(prototype: Entry, key: string): Promise<Entry> {
        let entry = await this.ngf.getItem<Entry>(key);
        if (!entry) {
            await this.ngf.setItem(key, {...prototype, key});
            entry = await this.ngf.getItem<Entry>(key);
        }
        return entry;
    }

    async getAllTags(): Promise<Set<string>> {
        const tags = new Set<string>();

        try {
            await this.ngf.iterate((obj: Entry, key: string, idx: number): void => {
                obj.tags.forEach((v) => {
                    tags.add(v);
                });
            });
        } catch (e) {
            console.error(e);
        }

        return tags;
    }

    async getEntryByTags(tags: string[]): Promise<Entry[]> {
        const result: Entry[] = [];

        try {
            await this.ngf.iterate((obj: Entry, key: string, idx: number): void => {
                if (obj.tags.some((v) => tags.includes(v))) {
                    result.push(obj);
                }
            });
        } catch (e) {
            console.error(e);
        }


        return result;
    }
}
