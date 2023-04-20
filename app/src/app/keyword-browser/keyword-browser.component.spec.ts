import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordBrowserComponent } from './keyword-browser.component';

describe('KeywordBrowserComponent', () => {
  let component: KeywordBrowserComponent;
  let fixture: ComponentFixture<KeywordBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordBrowserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
