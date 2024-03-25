import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCodeComponent } from './single-code.component';

describe('SingleCodeComponent', () => {
  let component: SingleCodeComponent;
  let fixture: ComponentFixture<SingleCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCodeComponent]
    });
    fixture = TestBed.createComponent(SingleCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
