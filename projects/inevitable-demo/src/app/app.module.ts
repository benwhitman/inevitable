import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InevitableModule } from 'inevitable';
import { AppComponent } from './app.component';
import { SimpleComponent } from './simple/simple.component';
import { SimpleObservableComponent } from './simple-observable/simple-observable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomRendererComponent } from './custom-renderer/custom-renderer.component';
import { GlobalFilterComponent } from './global-filter/global-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponent,
    SimpleObservableComponent,
    CustomRendererComponent,
    GlobalFilterComponent,
  ],
  imports: [
    BrowserModule,
    InevitableModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
