import { NgModule } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';
import { IconComponent } from './components/icons/icons.component';

@NgModule({
    declarations: [],
    imports: [ 
        TableComponent,
        IconComponent,
    ],
    exports: [ 
        TableComponent,
        IconComponent
    ],
    providers: [],
})
export class SharedModule {}