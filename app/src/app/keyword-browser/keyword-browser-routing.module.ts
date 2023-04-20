import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KeywordBrowserComponent} from "./keyword-browser.component";

const routes: Routes = [{ path: '', component: KeywordBrowserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeywordBrowserRoutingModule { }
