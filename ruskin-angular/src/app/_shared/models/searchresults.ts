import { Injectable } from '@angular/core';

/**
  SearchResults model
  */
  @Injectable()
  export class searchresults {
    _id: string;
    page: [{
      folio_num: string;
      content: string;
    }];
  }
