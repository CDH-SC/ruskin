import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempLetterComponent } from './temp-letter.component';

describe('TempLetterComponent', () => {
  let component: TempLetterComponent;
  let fixture: ComponentFixture<TempLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
