import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRoundComponent } from './match-round.component';

describe('MatchRoundComponent', () => {
  let component: MatchRoundComponent;
  let fixture: ComponentFixture<MatchRoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
