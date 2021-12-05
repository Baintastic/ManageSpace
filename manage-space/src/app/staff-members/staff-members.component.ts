import { Component, OnInit } from '@angular/core';
import { Office } from '../models/office';
import { StaffMember } from '../models/staff-member';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AddEditStaffMemberComponent } from './add-edit-staff-member/add-edit-staff-member.component';

@Component({
  selector: 'app-staff-members',
  templateUrl: './staff-members.component.html',
  styleUrls: ['./staff-members.component.css']
})

export class StaffMembersComponent implements OnInit {
  staffMembers: StaffMember[] = [];
  office: Office | undefined;
  searchText: string = "";

  constructor( private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getOffice();
    this.getAllStaffMembers();
   }

  getAllStaffMembers(): void {
    this.staffMembers = [{
      id: 1,
      firstName: 'Chris',
      lastName: 'Evans',
      avatar: 'red'
    }, {
      id: 1,
      firstName: 'Paul',
      lastName: 'Walker',
      avatar: 'red'
    }, {
      id: 1,
      firstName: 'Michael',
      lastName: 'Lite',
      avatar: 'red'
    },
    {
      id: 1,
      firstName: 'Boboy',
      lastName: 'Schmurda',
      avatar: 'red'
    }];
  }

  getOffice(): void {
    this.office = {
      id: 2,
      name: 'Carbon',
      physicalAddress: '8 Royale Rd',
      emailAddress: 'carbon@gmail.com',
      phoneNumber: '0312394888',
      maxCapacity: '15',
      colour: 'red'
    }
  }
  
  open(member?: any) {
    const modalRef = this.modalService.open(AddEditStaffMemberComponent, { centered: true });
    modalRef.componentInstance.staffmember = member;
  }

}
