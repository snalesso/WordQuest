import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Utf16CharToggleComponent } from './utf16-char-toggle.component';

describe('Utf16CharToggleComponent', () => {
  let component: Utf16CharToggleComponent;
  let fixture: ComponentFixture<Utf16CharToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Utf16CharToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Utf16CharToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
