import { Injectable } from '@angular/core';

/**
  Letter model
  */
  @Injectable()
  export class Letter {
    _id: number;
    date: string;
    author: string;
    addressee: string;
    letter_num: string;
  }
