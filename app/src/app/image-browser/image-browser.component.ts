import {Component, OnInit} from '@angular/core';
import {ImageService} from "./image.service";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";

@Component({
  selector: 'app-image-browser',
  templateUrl: './image-browser.component.html',
  styleUrls: ['./image-browser.component.sass']
})
export class ImageBrowserComponent implements OnInit{
  private imageListSubject = new ReplaySubject(1);
  imageList$: Observable<any> = this.imageListSubject.asObservable();

  constructor(private imageService: ImageService) {
  }

  //TODO: Use dialog first, then delete
  delete(id: number) {
    this.imageService.delete(id).subscribe({
      next: res => {
        console.log(res);
        this.imageListSubject.subscribe({
          next: existing => {
            const filtered = (<any[]>existing).filter(img => img.id != id);
            setTimeout(() => {
              this.imageListSubject.next(filtered);
            })
          }
        }).unsubscribe();
      },
      error: res => {
        console.error(res);
      }
    })
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
