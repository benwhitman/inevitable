import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MegatableLibModule } from 'megatable-lib';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MegatableLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
