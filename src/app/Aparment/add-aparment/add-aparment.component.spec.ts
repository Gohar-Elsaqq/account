import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAparmentComponent } from './add-aparment.component';

describe('AddAparmentComponent', () => {
  let component: AddAparmentComponent;
  let fixture: ComponentFixture<AddAparmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAparmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAparmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
