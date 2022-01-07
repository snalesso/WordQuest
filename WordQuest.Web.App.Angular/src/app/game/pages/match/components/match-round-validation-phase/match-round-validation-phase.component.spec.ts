import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRoundValidationPhaseComponent } from './match-round-validation-phase.component';

describe('MatchRoundValidationPhaseComponent', () => {
  let component: MatchRoundValidationPhaseComponent;
  let fixture: ComponentFixture<MatchRoundValidationPhaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchRoundValidationPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchRoundValidationPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
