import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { ImageBrowserRoutingModule } from './image-browser-routing.module';
import { ImageBrowserComponent } from './image-browser.component';
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    ImageBrowserComponent
  ],
    imports: [
        CommonModule,
        ImageBrowserRoutingModule,
        MatCardModule
    ]
})
export class ImageBrowserModule { }
