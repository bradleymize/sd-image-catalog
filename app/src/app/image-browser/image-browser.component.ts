import {Component, OnInit} from '@angular/core';
import {ImageService} from "./image.service";
import {Observable, ReplaySubject} from "rxjs";

@Component({
  selector: 'app-image-browser',
  templateUrl: './image-browser.component.html',
  styleUrls: ['./image-browser.component.sass']
})
export class ImageBrowserComponent implements OnInit{
  private imageListSubject = new ReplaySubject();
  imageList$: Observable<any> = this.imageListSubject.asObservable();

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.imageService.list().subscribe({
      next: res => {
        console.log(res);
        this.imageListSubject.next(res);
      },
      error: res => {
        console.error(res);
      }
    });
  }
}
