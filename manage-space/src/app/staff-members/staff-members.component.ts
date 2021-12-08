import { Component, OnInit } from '@angular/core';
import { OfficeI } from '../models/office';
import { StaffMemberI } from '../models/staff-member';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditStaffMemberComponent } from './add-edit-staff-member/add-edit-staff-member.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from './member.service';
import { OfficeService } from '../offices/office.service';
import { MemberOptionsComponent } from './member-options/member-options.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-staff-members',
  templateUrl: './staff-members.component.html',
  styleUrls: ['./staff-members.component.css']
})

export class StaffMembersComponent implements OnInit {
  staffMembers: StaffMemberI[] = [];
  office: any;
  searchText: string = '';
  memberId: any;
  officeId: string = '';
  isMaxCapacityReached: boolean = false;
  showCapacityReachedMessage: boolean = false;

  constructor(private modalService: NgbModal,
    private memberService: MemberService,
    private officeService: OfficeService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.officeId = this.route.snapshot.paramMap.get('id')!;
    this.getOfficeDetails(this.officeId);
    this.getAllStaffMembers(this.officeId);
  }

  getAllStaffMembers(officeId: string): void {
      this.memberService.getAllMembersByOfficeId(officeId).subscribe( data => {
        this.staffMembers = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as StaffMemberI
          }
        })
      }
    );
  }

  getOfficeDetails(officeId: string): void {
    this.officeService.listenToOfficeById(officeId).subscribe(data => {
      this.office = data as OfficeI;
      this.isMaxCapacityReached = this.office.numberOfPresentStaff + 1 <= this.office.maxCapacity ? false : true;
    })
  }

  openOptionsModal(memberId: string) {
    const modalRef = this.modalService.open(MemberOptionsComponent, { centered: true });
    modalRef.componentInstance.officeId = this.officeId;
    modalRef.componentInstance.memberId = memberId;
  }

  openAddMemberModal() {
    if(!this.isMaxCapacityReached){
      const modalRef = this.modalService.open(AddEditStaffMemberComponent, { centered: true });
      modalRef.componentInstance.officeId = this.officeId;
      modalRef.componentInstance.isAddMode = true;
    }
    else{
      this.showCapacityReachedMessage = true;
    }

    setTimeout(() => {
      this.showCapacityReachedMessage = false;
    }, 8000);
  }
}
