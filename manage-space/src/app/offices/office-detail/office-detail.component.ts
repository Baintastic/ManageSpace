import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Office } from 'src/app/models/office';
import { StaffMember } from 'src/app/models/staff-member';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.css']
})
export class OfficeDetailComponent implements OnInit {
  office: Office | undefined;
  staffMembers: StaffMember[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getOffice();
  }

  getOffice(): void {
    this.office = {
      id: 2,
      name: 'Carbon',
      physicalAddress: '8 Royale Rd',
      emailAddress: 'carbon@gmail.com',
      phoneNumber: '0312394888',
      maxCapacity: '15'
    }
  }

  goBack(): void {
    this.location.back();
  }

  deleteStaffMember(): void {
    console.log('deleted office');
  }

  deleteOffice(): void {
    console.log('deleted all staff members and office ');
  }
}
