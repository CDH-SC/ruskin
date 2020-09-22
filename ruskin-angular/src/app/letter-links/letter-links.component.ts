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

  letters: [Letter];
  fifties: [Letter];
  sixies: [Letter];
  seventies: [Letter];
  years: [[Number],[Letter]];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/letters').subscribe(data => {
      this.letters = data['data'];
      for(var i = 0; i < this.letters.length; i++) {
        var year = Number(this.letters[i]['docDate'].substring(0,4));
        if(year > 1849 && year < 1860) {
          console.log(year);
        } else if(year > 1859 && year < 1870) {
          console.log(year);
        } else if(year > 1869 && year < 1880) {
          console.log(year);
        }
      }
    });
  }

  // Filters the letter links by specified string
  // filterBy(prop: string) {
  //   return this.letter.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  // }
}
