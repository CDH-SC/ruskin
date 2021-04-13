import { Injectable } from '@angular/core';

/**
  Letter model
  */
  @Injectable()
  export class Letter {
    _id: number;
    xml_id: string;
    docDate: string;
    docDateString: string;
    sender: string;
    addressee: string;
    sourceNote: string;
    docBody: string;
  }
