import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get('/api/keyword');
  }

  get(id: number) {
    return this.http.get(`/api/keyword/${id}`);
  }
}
