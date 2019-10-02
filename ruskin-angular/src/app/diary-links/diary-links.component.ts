import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/pageview.service';
import { Diary } from '../_shared/models/diary';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-diary-links',
  templateUrl: './diary-links.component.html',
  styleUrls: ['./diary-links.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class DiaryLinksComponent implements OnInit {

  diary: [Diary];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/diaries').subscribe(data => {
      this.diary = data['data'];
    });
  }

  // Filters the diary links by specified string
  // filterBy(prop: string) {
  //   return this.diary.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  // }
}
