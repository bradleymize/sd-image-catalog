import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromptTemplateRoutingModule } from './prompt-template-routing.module';
import { PromptTemplateComponent } from './prompt-template.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    PromptTemplateComponent
  ],
  imports: [
    CommonModule,
    PromptTemplateRoutingModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class PromptTemplateModule { }
