import { NgModule } from '@angular/core';
import { MegatableLibComponent } from './megatable-lib.component';
import { MatTableModule, MatSortModule, MatToolbarModule, MatPaginatorModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

/*
cell renderer components
*/
import { DefaultCellRendererComponent } from '../lib/cell-renderers/default/default-cell-renderer.component';

@NgModule({
  declarations: [
    MegatableLibComponent,
    DefaultCellRendererComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ],
  exports: [MegatableLibComponent]
})
export class MegatableLibModule { }
