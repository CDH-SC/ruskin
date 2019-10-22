import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Diary } from '../_shared/models/diary';
import { Letter } from '../_shared/models/letter';
import { PagerService } from '../_shared/_services/index';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-temp-letter',
  templateUrl: './temp-letter.component.html',
  styleUrls: ['./temp-letter.component.scss'],
// encapsulation: ViewEncapsulation.None
})
export class TempLetterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  console.log('hi');
  }

}
