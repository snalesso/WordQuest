import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRoundPhasesComponent } from './match-round-phases.component';

describe('MatchRoundPhasesComponent', () => {
  let component: MatchRoundPhasesComponent;
  let fixture: ComponentFixture<MatchRoundPhasesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchRoundPhasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchRoundPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
