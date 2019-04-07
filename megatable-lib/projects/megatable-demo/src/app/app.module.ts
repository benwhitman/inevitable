import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MegatableLibModule } from 'megatable-lib';
import { AppComponent } from './app.component';
import { SimpleComponent } from './simple/simple.component';
import { SimpleObservableComponent } from './simple-observable/simple-observable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomRendererComponent } from './custom-renderer/custom-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponent,
    SimpleObservableComponent,
    CustomRendererComponent
  ],
  imports: [
    BrowserModule,
    MegatableLibModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
