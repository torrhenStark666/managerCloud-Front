import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTermPayComponent } from './add.component';

describe('AddTermPayComponent', () => {
  let component: AddTermPayComponent;
  let fixture: ComponentFixture<AddTermPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTermPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTermPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
