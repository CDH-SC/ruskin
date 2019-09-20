import { Component, OnInit } from '@angular/core';
import { searchresults } from '../_shared/models/searchresults';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchTerm: string;
  searchResults: searchresults;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // Get search term from router
    const searchTerm = this.route.snapshot.paramMap.get('search');

    // Pass search term through search api and subscribe to results
    this.http.get('/api/search/'+searchTerm).subscribe( res2 => {
      this.searchResults = res2["data"];
      console.log(this.searchResults);
    });

    // Reloads page when url changes
    this.router.events.subscribe(path => {
      location.reload();
    });
  }

}
