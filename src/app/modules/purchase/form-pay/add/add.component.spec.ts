import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormPayComponent } from './add.component';

describe('AddFormPayComponent', () => {
  let component: AddFormPayComponent;
  let fixture: ComponentFixture<AddFormPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
