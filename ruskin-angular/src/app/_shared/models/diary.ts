import { Injectable } from '@angular/core';

/**
  Diary model
  */
  @Injectable()
  export class Diary {
    _id: number;
    date: string;
    notebook_url: string;
    volume_num: string;
    ms_num: number;
    page: [{
      number: number;
      folio_num: string;
      image: string;
      content: string;
      transcriber: string;
      hand: string;
    }];
  }
