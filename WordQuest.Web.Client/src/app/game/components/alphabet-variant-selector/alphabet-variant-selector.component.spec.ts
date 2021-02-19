import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetVariantSelectorComponent } from './alphabet-variant-selector.component';

describe('AlphabetVariantSelectorComponent', () => {
  let component: AlphabetVariantSelectorComponent;
  let fixture: ComponentFixture<AlphabetVariantSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphabetVariantSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabetVariantSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
