import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PromptTemplateService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`/api/promptTemplate`);
  }

  get(id: number) {
    return this.http.get(`/api/promptTemplate/${id}`);
  }

  post(payload: any) {
    return this.http.post(`/api/promptTemplate`, payload);
  }

  put(id: number, payload: any) {
    return this.http.put(`/api/promptTemplate/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`/api/promptTemplate/${id}`);
  }
}
