import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router) { }

  // Goes to search results page when enter is pressed
  onEnter(route) {
     this.router.navigate(['search-results/', route]);
  }

  ngOnInit() {

  }
}
