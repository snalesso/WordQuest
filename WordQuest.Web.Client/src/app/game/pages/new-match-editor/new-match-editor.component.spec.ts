import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewMatchEditorComponent } from './new-match-editor.component';

describe('NewMatchEditorComponent', () => {
  let component: NewMatchEditorComponent;
  let fixture: ComponentFixture<NewMatchEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMatchEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMatchEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
