import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ComponentsModule } from '../../projects/components/src/lib/components.module';
import { ButtonModule } from '../../projects/button/src/lib/button.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgxMatTypeaheadModule } from 'projects/ngx-mat-typeahead/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ComponentsModule,
    ButtonModule,
    BrowserAnimationsModule,
    NgxMatTypeaheadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
