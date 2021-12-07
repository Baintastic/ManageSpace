import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberOptionsComponent } from './member-options.component';

describe('MemberOptionsComponent', () => {
  let component: MemberOptionsComponent;
  let fixture: ComponentFixture<MemberOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
