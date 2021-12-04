import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Office } from 'src/app/models/office';
import { StaffMember } from 'src/app/models/staff-member';
import { Location } from '@angular/common';

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
    private location: Location
  ) { }

  ngOnInit(): void {
    console.log('im in AGANI!! it is ', this.office);
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

    this.getStaffMembers();
  }

  getStaffMembers(): void {
    this.staffMembers = [{
      id: 1,
      firstName: 'Chris',
      lastName: 'Evans'
    }, {
      id: 1,
      firstName: 'Paul',
      lastName: 'Walker'
    }, {
      id: 1,
      firstName: 'Michael',
      lastName: 'Lite'
    },
    {
      id: 1,
      firstName: 'Boboy',
      lastName: 'Schmurda'
    }];
  }

  goBack(): void {
    this.location.back();
  }

}
