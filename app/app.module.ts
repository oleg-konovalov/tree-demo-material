import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppMaterialModule } from './app.material.module';
import { AppComponent } from './app.component';
import { ContentFormComponent } from 'app/form/form.component';
import { TreeModule } from 'angular-tree-component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    TreeModule
  ],
  declarations: [
    AppComponent,
    ContentFormComponent,

  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
