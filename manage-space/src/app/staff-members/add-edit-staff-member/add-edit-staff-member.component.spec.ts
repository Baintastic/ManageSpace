import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStaffMemberComponent } from './add-edit-staff-member.component';

describe('AddEditStaffMemberComponent', () => {
  let component: AddEditStaffMemberComponent;
  let fixture: ComponentFixture<AddEditStaffMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditStaffMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditStaffMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
