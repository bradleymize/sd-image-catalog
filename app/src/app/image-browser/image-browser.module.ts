import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { ImageBrowserRoutingModule } from './image-browser-routing.module';
import { ImageBrowserComponent } from './image-browser.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ImageBrowserComponent
  ],
  imports: [
    CommonModule,
    ImageBrowserRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ImageBrowserModule { }
