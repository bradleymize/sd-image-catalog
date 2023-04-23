import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./image-browser/image-browser.module').then(m => m.ImageBrowserModule) },
  { path: 'upload', loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule) },
  { path: 'keywords', loadChildren: () => import('./keyword-browser/keyword-browser.module').then(m => m.KeywordBrowserModule) },
  { path: 'prompt-template', loadChildren: () => import('./prompt-template/prompt-template.module').then(m => m.PromptTemplateModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
