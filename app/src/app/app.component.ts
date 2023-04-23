import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'sd-image-catalog';
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Image Browser',
        link: '',
        index: 0
      }, {
        label: 'Upload',
        link: './upload',
        index: 1
      }, {
        label: 'Keywords',
        link: './keywords',
        index: 2
      }, {
        label: 'Prompt Template',
        link: './prompt-template',
        index: 2
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
