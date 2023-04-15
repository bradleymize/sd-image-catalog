import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import {MatCardModule} from "@angular/material/card";
import {CdkDropList, DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";
import { DndDirective } from './dnd.directive';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    UploadComponent,
    DndDirective
  ],
    imports: [
      CommonModule,
      UploadRoutingModule,
      MatCardModule,
      DragDropModule,
      CdkDropList,
      MatButtonModule,
      MatProgressBarModule,
      MatSnackBarModule
    ]
})
export class UploadModule { }
