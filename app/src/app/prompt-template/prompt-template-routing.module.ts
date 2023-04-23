import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PromptTemplateComponent} from "./prompt-template.component";

const routes: Routes = [{ path: '', component: PromptTemplateComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromptTemplateRoutingModule { }
