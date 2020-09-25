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
  fifties: any[] = [[],[]];
  sixties: any[] = [[],[]];
  seventies: any[] = [[],[]];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/letters').subscribe(data => {
      this.letters = data['data'];
      var years = [];
      var yearLetters = [];
      for(var i = 0; i < this.letters.length; i++) {
        var year = Number(this.letters[i]['docDate'].substring(0,4));
        if(!years.includes(year)) {
          years.push(year);
          yearLetters.push([this.letters[i]]);
        } else {
          yearLetters[years.indexOf(year)].push(this.letters[i]);
        }
      }
      for(var i = 0; i < years.length; i++) {        
        if(years[i] > 1849 && years[i] < 1860) {
          this.fifties[0].push(years[i]);
          this.fifties[1].push(yearLetters[i]);
        } else if(years[i] > 1859 && years[i] < 1870) {
          this.sixties[0].push(years[i]);
          this.sixties[1].push(yearLetters[i]);
        } else if(years[i] > 1869 && years[i] < 1880) {
          this.seventies[0].push(years[i]);
          this.seventies[1].push(yearLetters[i]);
        }
      }
    });
  }

  // Filters the letter links by specified string
  // filterBy(prop: string) {
  //   return this.letter.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  // }
}
