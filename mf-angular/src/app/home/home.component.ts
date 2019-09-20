import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  diary: String;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/diaries').subscribe(data => {
      this.diary = data['data']['docs'];
    });

    if (document.cookie.split(';').filter(item => item.includes('copyright=')).length) {
      // Cookie 'copyright' exists
      if (document.cookie.split(';').filter(item => item.includes('copyright=false')).length) {
        jQuery('#copyrightModal').modal('show');
      }
    } else {
      jQuery('#copyrightModal').modal('show');
    }
  }

  agree() {
    document.cookie = 'copyright=true';
    jQuery('#copyrightModal').modal('hide');
  }

  // ngAfterContentInit() {
  //   if (document.cookie.split(';').filter(item => item.includes('copyright=')).length) {
  //     // Cookie "copyright" exists
  //     if (document.cookie.split(';').filter(item => item.includes('copyright=false')).length) {
  //       this.showCopyright();
  //     }
  //   } else {
  //     this.showCopyright();
  //   }
  // }

}
