import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersSelectorComponent } from './letters-selector.component';

describe('LettersSelectorComponent', () => {
  let component: LettersSelectorComponent;
  let fixture: ComponentFixture<LettersSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LettersSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
