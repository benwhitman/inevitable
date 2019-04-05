import { NgModule } from '@angular/core';
import { MegatableLibComponent } from './megatable-lib.component';
import { MatTableModule, MatSortModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MegatableLibComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ],
  exports: [MegatableLibComponent]
})
export class MegatableLibModule { }
