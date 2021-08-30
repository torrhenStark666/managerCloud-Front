import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReleaserComponent } from './add-releaser.component';

describe('AddReleaserComponent', () => {
  let component: AddReleaserComponent;
  let fixture: ComponentFixture<AddReleaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReleaserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReleaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
