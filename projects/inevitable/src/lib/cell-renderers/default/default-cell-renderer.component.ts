import { Component, Input } from '@angular/core';
import { TableMetadata, ColumnMetadata, DataType } from '../../models/metadata';
import { TableConfig } from '../../models/table-config';

@Component({
  selector: 'inevitable-cell-default',
  templateUrl: './default-cell-renderer.component.html',
  styles: ['./default-cell-renderer.component.scss']
})
export class DefaultCellRendererComponent {

    @Input()
    data: string;

    @Input()
    renderer: (cellData: any) => string;

    constructor() {
      console.log('MEGA renderer', this.renderer);
    }
}
