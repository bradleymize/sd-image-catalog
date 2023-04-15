import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFiles(files: any[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file.file));

    return this.http.post('/api/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  test() {
    return this.http.get('/api/ping');
  }
}
