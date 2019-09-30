import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Diary } from '../_shared/models/diary';
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
    // Get diary id + current page number from router
    const id = this.route.snapshot.paramMap.get('id');
    const pageNum = this.route.snapshot.paramMap.get('pageNum');

    // Pass diary id through diairy api and subscribe to resulting data
    this.http.get('/api/diaries/' + id).subscribe(data => {
      this.diary = data['data'];
      this.allItems = data['data']['page'];

      // initialize page to pageNum from router
      this.setPage(+pageNum);
    });
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
