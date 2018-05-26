import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlformsComponent } from './htmlforms.component';

describe('HtmlformsComponent', () => {
  let component: HtmlformsComponent;
  let fixture: ComponentFixture<HtmlformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
