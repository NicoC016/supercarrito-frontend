import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isDarkMode } from 'src/app/extra/navbar/helpers/navbar.helper';

@Component({
    selector: 'table-component',
    templateUrl: './table.component.html',
    standalone: true,
    imports: [CommonModule],
})
export class TableComponent {
    @Input() public headersTr: any [] = [];
    @Input() public bodyTd: any[] = [];
    @Output() public deleteEvent:EventEmitter<any> = new EventEmitter();
    @Output() public editEvent:EventEmitter<string> = new EventEmitter();
    public first = 0;
    public rows = 10;

    delete(row:any){
        this.deleteEvent.emit(row);
    }
    isDarkMode(){
        return isDarkMode();
    }

    edit(row:any){
        this.editEvent.emit(row);
    }

        next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event:any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        return this.bodyTd ? this.first === this.bodyTd.length - this.rows : true;
    }

    isFirstPage(): boolean {
        return this.bodyTd ? this.first === 0 : true;
    }
    
}
