import { Component, OnInit } from '@angular/core';
import { Office } from '../models/office';
import { StaffMember } from '../models/staff-member';

@Component({
  selector: 'app-staff-members',
  templateUrl: './staff-members.component.html',
  styleUrls: ['./staff-members.component.css']
})
export class StaffMembersComponent implements OnInit {
  staffMembers: StaffMember[] = [];
  office: Office | undefined;
  
  constructor() { }

  ngOnInit(): void {
    this.getOffice();
    this.getAllStaffMembers();
  }

  getAllStaffMembers(): void {
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
  
}
