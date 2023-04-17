import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get('/api/image');
  }

  delete(id: number) {
    return this.http.delete(`/api/image/${id}`);
  }
}
