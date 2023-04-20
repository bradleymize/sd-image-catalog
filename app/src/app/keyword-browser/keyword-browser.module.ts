import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeywordBrowserRoutingModule } from './keyword-browser-routing.module';
import { KeywordBrowserComponent } from './keyword-browser.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    KeywordBrowserComponent
  ],
  imports: [
    CommonModule,
    KeywordBrowserRoutingModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule
  ]
})
export class KeywordBrowserModule { }
