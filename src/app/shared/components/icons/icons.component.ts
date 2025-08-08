import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { SafeHtmlPipe } from '@shared/pipes/safeHtml.pipe';

@Component({
    selector: 'icons',
    imports: [CommonModule, SafeHtmlPipe],
    standalone: true,
    template: `
        <svg class="icon-default" *ngIf="icon" [innerHTML]="icon | safeHtml"></svg>
    `,
})
export class IconComponent implements OnInit {
    @Input() iconName: string = '';
    public icon: string | null = null;
    constructor(private http:HttpClient) { }

    ngOnInit() {
        this.http.get(`./assets/img/svg/${this.iconName}.svg`, { responseType: 'text' }).subscribe(svg => {
            this.icon = svg;
        });
    }
}
