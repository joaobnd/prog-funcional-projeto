import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlPublic: string = `https://api.github.com/events`
  urlPrivate: string =  `https://api.github.com/repos/rails/rails/events`

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getEvents(repo: string): Observable<any[]> {
    if(repo === 'private') {return this.httpClient.get<any[]>(this.urlPrivate)}
    else {
      return this.httpClient.get<any[]>(this.urlPublic)
    }

  }
}

export type repo = 'public' | 'private';
