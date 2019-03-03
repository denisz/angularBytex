import {Component, Input, ElementRef, OnChanges} from '@angular/core';

@Component({
    selector: 'app-read-more',
    template: `
        <div [innerHTML]="currentText">
        </div>
        <a [class.hidden]="hideToggle" class="read-more" (click)="toggleView()">Read {{isCollapsed ? 'more' : 'less'}}</a>
    `,
    styleUrls: ['./readmore.component.css'],
})

export class ReadMoreComponent implements OnChanges {
    @Input() text: string;
    @Input() maxLength = 100;
    currentText: string;
    hideToggle = true;

    public isCollapsed = true;

    constructor(private elementRef: ElementRef) {

    }

    toggleView() {
        this.isCollapsed = !this.isCollapsed;
        this.determineView();
    }

    determineView() {
        if (!this.text || this.text.length <= this.maxLength) {
            this.currentText = this.text;
            this.isCollapsed = false;
            this.hideToggle = true;
            return;
        }

        this.hideToggle = false;
        if (this.isCollapsed) {
            this.currentText = this.text.substring(0, this.maxLength) + '...';
        } else {
            this.currentText = this.text;
        }

    }

    ngOnChanges() {
        this.determineView();
    }
}
