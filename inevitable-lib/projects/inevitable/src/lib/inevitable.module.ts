import { NgModule } from '@angular/core';
import { InevitableComponent } from './inevitable.component';
import { MatTableModule, MatSortModule, MatToolbarModule, MatPaginatorModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

/*
cell renderer components
*/
import { DefaultCellRendererComponent } from './cell-renderers/default/default-cell-renderer.component';

@NgModule({
  declarations: [
    InevitableComponent,
    DefaultCellRendererComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    DragDropModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ],
  exports: [InevitableComponent]
})
export class InevitableModule { }
