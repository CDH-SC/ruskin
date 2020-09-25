import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Diary } from '../_shared/models/diary';
import { Letter } from '../_shared/models/letter';
import { PagerService } from '../_shared/_services/index';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss'],
// encapsulation: ViewEncapsulation.None
})
export class PageViewComponent implements OnInit {

  // Define diary object
  diary: Diary;

  // Define letter object
  letter: Letter;

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  // Default page
  folio_num: String;
  page = 1;
  pageNum: number;

  // HTML
  content: SafeHtml;

  // Default Transcription Status
  transcriptionStatus = '**';

  constructor(
    private http: HttpClient,
    private pagerService: PagerService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    // Get diary/letter id + current page number from router
    const id = this.route.snapshot.paramMap.get('id');
    const pageNum = this.route.snapshot.paramMap.get('pageNum');

    // Pass diary/letter id through api and subscribe to resulting data
    if (this.router.url.includes('letters')) {
      this.http.get('/api/letters/' + pageNum).subscribe(data => {
      this.letter = data['data'];
      });

    } else {
      this.http.get('/api/diaries/' + id).subscribe(data => {
      this.diary = data['data'];
      this.allItems = data['data']['page'];
      
      // initialize page to pageNum from router
      this.setPage(+pageNum);
      });
    }
  }

  setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }

      // get pager object from service
      this.pager = this.pagerService.getPager(this.allItems.length, page);
      this.page = this.pager.currentPage;

      const id = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['page-view/', id, page]);
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.diary.page[page].content);
      // check if this works when there is a transcription
      if (JSON.stringify(this.content) == "{}") {
        this.content = "[The John Ruskin Diaries have not yet been transcribed]";
      }
      // console.log(this.diary.notebook_url + this.diary.page[page-1].image);
  }

  jumpToFolio(folioValue) {
    let i;
    for (i = 0; i < this.allItems.length; i++) {
      console.log(this.allItems[i].folio_num);
      if (folioValue === this.allItems[i].folio_num) {
        this.setPage(i + 1);
        break;
      }
    }
  }

  goToGroup(group) {
    const x = group + 1;
    this.setPage(x);
  }
}
