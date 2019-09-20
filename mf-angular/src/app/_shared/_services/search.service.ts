import { Injectable } from '@angular/core';
import { Diary } from '../models/diary';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  diary: Diary;

  constructor(
    private http: HttpClient,
  ) { }

  search(search: string) {
    console.log(search);

    return this.http.get('/api/search/'+search);
  }
}
