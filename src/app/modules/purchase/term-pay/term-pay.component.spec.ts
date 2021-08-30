import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermPayComponent } from './term-pay.component';

describe('TermPayComponent', () => {
  let component: TermPayComponent;
  let fixture: ComponentFixture<TermPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
