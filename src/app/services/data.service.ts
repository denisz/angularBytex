import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {BehaviorSubject} from 'rxjs';


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
    private db: Dexie;

    private entries: Dexie.Table<Entry, string>;

    constructor() {
        this.db = new Dexie('openLibrary');
        this.db.version(1)
            .stores({
                entries: 'key, *tags',
            });

        this.db.open()
            .catch(err => {
                console.error(`Open failed: ${err.stack}`);
            });

        this.entries = this.db.table('entries');
    }

    async getChannelsForEntry(entry: Entry): Promise<ChannelsEntry> {
        const tags$ = new BehaviorSubject<string[]>(entry.tags);
        const setTags = new Set<string>(entry.tags);

        const saveTag = async (): Promise<Entry> => {
            entry.tags = Array.from(setTags);
            try {
                await this.entries.put(entry);
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
        let entry = await this.entries.get(key);
        if (!entry) {
            await this.entries.add({key, ...prototype});
            entry = await this.entries.get(key);
        }
        return entry;
    }

    async getAllTags(): Promise<Set<string>> {
        const tags = new Set<string>();
        await this.entries.each((obj) => {
            obj.tags.forEach((v) => {
                tags.add(v);
            });
        });

        return tags;
    }

    async getEntryByTags(tags: string[]): Promise<Entry[]> {
        if (tags.length === 0) {
            return this.entries.toArray();
        }

        return this.entries.where('tags').anyOf(tags).toArray();
    }
}
