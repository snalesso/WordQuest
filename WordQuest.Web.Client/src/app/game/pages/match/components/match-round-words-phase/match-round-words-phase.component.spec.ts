import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRoundWordsPhaseComponent } from './match-round-words-phase.component';

describe('MatchRoundWordsPhaseComponent', () => {
  let component: MatchRoundWordsPhaseComponent;
  let fixture: ComponentFixture<MatchRoundWordsPhaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchRoundWordsPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchRoundWordsPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
