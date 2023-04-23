import {Component, OnInit} from '@angular/core';
import {PromptTemplateService} from "./prompt-template.service";
import {Observable, ReplaySubject} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-prompt-template',
  templateUrl: './prompt-template.component.html',
  styleUrls: ['./prompt-template.component.sass']
})
export class PromptTemplateComponent implements OnInit {
  private promptTemplateListSubject = new ReplaySubject(1);
  promptTemplateList$: Observable<any> = this.promptTemplateListSubject.asObservable();

  name = new FormControl('', [Validators.required]);
  description = new FormControl('');
  positivePrompt = new FormControl('');
  negativePrompt = new FormControl('');
  settings = new FormControl('');

  addNew = false;

  constructor(private promptTemplateService: PromptTemplateService, private _snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getPromptTemplates();
  }

  getPromptTemplates() {
    this.promptTemplateService.list().subscribe({
      next: res => {
        console.log(res);
        this.promptTemplateListSubject.next(res);
      },
      error: res => {
        console.error(res);
      }
    });
  }

  copy(event: any, item: any) {
    event.preventDefault();
    event.stopPropagation();

    console.log(item.positivePrompt);
    console.log(item.negativePrompt);
    console.log(item.settings);
    this._snackbar.open(`${item.name} template copied to clipboard`, "dismiss", {panelClass: ["primary-snackbar"], duration: 3500});
  }

  save(): void {
    this.promptTemplateService.post({
      name: this.name.value,
      description: this.description.value,
      positivePrompt: this.positivePrompt.value,
      negativePrompt: this.negativePrompt.value,
      settings: this.settings.value
    }).subscribe({
      next: res => {
        console.log(res);
        this.getPromptTemplates();
      },
      error: res => {
        console.error(res);
      }
    });
  }
}
