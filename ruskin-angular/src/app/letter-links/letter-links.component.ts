import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/pageview.service';
import { Letter } from '../_shared/models/letter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-letter-links',
  templateUrl: './letter-links.component.html',
  styleUrls: ['./letter-links.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LetterLinksComponent implements OnInit {

  letter: [Letter];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/letters').subscribe(data => {
      this.letter = data['data'];
    });
  }

  // Filters the letter links by specified string
  // filterBy(prop: string) {
  //   return this.letter.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  // }
}
