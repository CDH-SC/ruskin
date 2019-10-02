import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryLinksComponent } from './diary-links.component';

describe('DiaryLinksComponent', () => {
  let component: DiaryLinksComponent;
  let fixture: ComponentFixture<DiaryLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
