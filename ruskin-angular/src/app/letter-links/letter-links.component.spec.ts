import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterLinksComponent } from './letter-links.component';

describe('LetterLinksComponent', () => {
  let component: LetterLinksComponent;
  let fixture: ComponentFixture<LetterLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
